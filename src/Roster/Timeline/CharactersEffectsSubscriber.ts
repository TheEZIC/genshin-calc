import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";
import Character from "@/Characters/Character";
import {TimelineItemType} from "@/Roster/Timeline/Timeline";
import TimelineEffectsSubscriber from "@/Roster/Timeline/TimelineEffectsSubscriber";

export class CharactersEffectsSubscriber extends TimelineEffectsSubscriber<Character> {
  public runOnEvent(args: IAnySKillListenerArgs<Character>) {
    const startFrame = 0;
    const duration = args.effect.framesDuration;
    const endFrame = startFrame + duration;

    this.timeline.timelineItems.push({
      type: TimelineItemType.Effect,
      startFrame,
      endFrame,
      duration,
      item: args.effect,
      characterSnapshot: args.entity,
    });
  }
}
