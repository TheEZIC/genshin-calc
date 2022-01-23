import Skill from "@/Skills/Skill";
import {IOngoingSkill, ISkillsItem} from "@/Roster/DamageCalculator";
import Effect from "@/Effects/Effect";
import Character from "@/Characters/Character";
import {ISubscriber} from "@/Helpers/Listener";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";
import SummonSkill from "@/Skills/SummonSkill";

enum TimelineItemType {
  Skill,
  Effect,
}

interface ITimelineBase {
  duration: number;
  startFrame: number;
  endFrame: number;
}

interface ITimelineItem extends ITimelineBase {
  type: TimelineItemType;
  item: Effect<any> | Skill;
}

interface ITimelineChunk extends ITimelineBase {
  activeSkills: Skill[];
  activeEffects: Effect<any>[];
}

export default class Timeline implements ISubscriber<IAnySKillListenerArgs<any>> {
  constructor(
    private rotationSkills: Skill[],
    private rosterSkills: ISkillsItem[],
  ) {
    this.generateTimeline();
    this.generateChunks();
  }

  public timelineItems: ITimelineItem[] = [];

  private get timelineItemsSortedByStartFrame(): ITimelineItem[] {
    return this.timelineItems.sort((a, b) => a.startFrame - b.startFrame);
  }

  private get timelineItemsSortedByEndFrame(): ITimelineItem[] {
    return this.timelineItems.sort((a, b) => a.endFrame - b.endFrame);
  }

  private get timelineItemsSortedByDuration(): ITimelineItem[] {
    return this.timelineItems.sort((a, b) => a.duration - b.duration);
  }

  private getTimelineItemAt(frame: number, type: TimelineItemType) {
    return this.timelineItems.filter((t) => (
      t.startFrame <= frame
      && t.endFrame > frame
      && t.type === type
    ));
  }

  public chunks: ITimelineChunk[] = [];

  private generateChunks() {
    const skillsOnly = this.timelineItems.filter((t) => t.type === TimelineItemType.Skill);
    const startFrames = this.timelineItems.map((t) => t.startFrame);
    const endFrames = this.timelineItems.map((t) => t.startFrame + t.duration);
    const allFrames: number[] = [...startFrames, ...endFrames];
    const uniqueAllFrames = [...new Set(allFrames)].sort((a, b) => a - b);

    for (let i = 0; i < uniqueAllFrames.length; i++) {
      const currentFrame = uniqueAllFrames[i];
      const nextFrame = uniqueAllFrames[i + 1];
      const skills = new Set<ITimelineItem>();
      const effects = new Set<ITimelineItem>();

      this.getTimelineItemAt(currentFrame, TimelineItemType.Skill).forEach((t) => skills.add(t));
      this.getTimelineItemAt(currentFrame, TimelineItemType.Effect).forEach((t) => effects.add(t));

      if (skills.size === 0) {
        continue;
      }

      this.chunks.push({
        startFrame: currentFrame,
        endFrame: nextFrame,
        duration: nextFrame - currentFrame,
        activeSkills: Array.from(skills).filter(s => s.item instanceof Skill).map(s => s.item as Skill),
        activeEffects: Array.from(effects).filter(s => s.item instanceof Effect).map(e => e.item as Effect<any>),
      });
    }
  }

  private generateTimeline() {
    const {rosterSkills, rotationSkills} = this;
    const rotationCharacters: Character[] = [];
    let ongoingSkills: IOngoingSkill[] = [];
    let frames: number = 0; //considering the duration of the summons (need for damage calculation)
    let prevSkill: Skill | null = null;

    rosterSkills.forEach((rs) => {
      if (!rotationCharacters.includes(rs.character))
        rotationCharacters.push(rs.character);
    });

    for (let character of rotationCharacters) {
      character.onAnyEffectStarted.subscribe(this);
    }

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = rosterSkills.find((s) => s.skill.name === rotationSkill.name);

      if (!skillItem) continue;

      const {skill, character} = skillItem;
      const duration = skill.frames;
      const startFrame = frames;
      const endFrame = startFrame + skill.timelineDurationFrames;
      const onEndStartFrame = frames
        - (prevSkill?.frames ?? 0)
        + (prevSkill?.timelineDurationFrames ?? 0);

      if (skill instanceof SummonSkill) {
        this.timelineItems.push({
          type: TimelineItemType.Skill,
          startFrame: endFrame,
          endFrame: duration,
          duration: duration - endFrame,
          item: rotationSkill,
        });
      } else {
        this.timelineItems.push({
          type: TimelineItemType.Skill,
          startFrame,
          endFrame,
          duration,
          item: rotationSkill,
        });
      }

      ongoingSkills.push({startTime: frames, skill});
      character.ongoingEffects.forEach((b) => b.update(character, frames));
      skill.getDamage(character, frames, rotationSkills, i);

      ongoingSkills
        .filter((s) => s.startTime + s.skill.frames <= frames)
        .map((s) => {
          s.skill.strategy.runEndListener(character, onEndStartFrame)
          return s;
        })
        .filter((s) => !(s.startTime + s.skill.frames <= frames));

      prevSkill = skill;
      frames += skill.timelineDurationFrames;
    }

    for (let character of rotationCharacters) {
      character.onAnyEffectStarted.unsubscribe(this);
    }

    this.timelineItems = this.timelineItems.sort((a, b) => a.startFrame - b.startFrame);

    return this.timelineItems;
  }

  runOnEvent(args: IAnySKillListenerArgs<any>) {
    const startFrame = args.startTime;
    const duration = args.effect.framesDuration;
    const endFrame = startFrame + duration;

    this.timelineItems.push({
      type: TimelineItemType.Effect,
      startFrame,
      endFrame,
      duration,
      item: args.effect,
    });
  };
}
