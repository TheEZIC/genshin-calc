import Skill from "@/Skills/Skill";
import Character from "@/Characters/Character";
import Roster from "@/Roster/Roster";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import CalculatorSkillSubscriber from "@/Roster/Subsrcribers/CalculatorSkillSubscriber";
import NormalSkill from "@/Skills/NormalSkill";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SummonSkill from "@/Skills/SummonSkill";

export interface ISkillsItem {
  character: Character;
  skill: Skill;
}

export interface IOngoingSkill {
  startTime: number;
  skill: Skill;
}

export default class DamageCalculator {
  constructor(
    private roster: Roster,
  ) {
  }

  private elementalReactionManager = new ElementalReactionManager();
  private ongoingSkills: Skill[] = [];

  private onAnySKillStarted(skill: Skill) {
    this.ongoingSkills.push(skill);
  }

  private onAnySkillEnded(skill: Skill) {
    this.ongoingSkills = this.ongoingSkills.filter(s => s.name !== s.name);
  }

  private readonly onSkillStartSubscriber = new CalculatorSkillSubscriber(this.onAnySKillStarted.bind(this));
  private readonly onSkillEndSubscriber = new CalculatorSkillSubscriber(this.onAnySkillEnded.bind(this));

  private subscribeAllCharacters() {
    this.roster.characters.forEach(c => {
      c.skillManager.onAnySkillStarted.subscribe(this.onSkillStartSubscriber);
      c.skillManager.onAnySkillEnded.subscribe(this.onSkillEndSubscriber);
    });
  }

  private unsubscribeAllCharacters() {
    this.roster.characters.forEach(c => {
      c.skillManager.onAnySkillStarted.unsubscribe(this.onSkillStartSubscriber);
      c.skillManager.onAnySkillEnded.unsubscribe(this.onSkillEndSubscriber);
    });
  }

  private get charactersSkills(): ISkillsItem[] {
    return this.roster.characters.map((char) => char.skillManager.allSkills.map((s) => ({ skill: s, character: char }))).flat();
  }

  public calcRotation(rotationSkills: Skill[]): number {
    let rotationDmg: number = 0
    let rotationFrames: number = 0;

    this.subscribeAllCharacters()
    //const timeline = new Timeline(this.roster, rotationSkills, this.charactersSkills);

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = this.charactersSkills.find((s) => s.skill.name === rotationSkill.name);

      if (!skillItem) continue;
      const {character, skill} = skillItem;
      let currentSkillDmg = 0;

      console.log("before", skill.name, currentSkillDmg, rotationFrames, character.ongoingEffects.map(e => e.name), this.ongoingSkills.map(s => s.name));
      skill.start(character);

      if (
        skill instanceof NormalSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Adaptive
      ) {
        for (let frame = 0; frame < skill.frames; frame++) {
          //this.ongoingSkills.forEach(s => s.update(character));
          skill.update(character);
          currentSkillDmg += skill.getDamage({
            character,
            skills: rotationSkills,
            currentSkillIndex: i,
          });
        }
      } else if (
        skill instanceof NormalSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Snapshot
      ) {
        //...
      } else if (
        skill instanceof SummonSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Adaptive
      ) {
        //...
      } else if (
        skill instanceof SummonSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Snapshot
      ) {
        for (let frame = 0; frame < skill.summonUsageFrames; frame++) {
          skill.update(character);
        }

        currentSkillDmg += skill.getDamage({
          character,
          skills: rotationSkills,
          currentSkillIndex: i,
          mvsCalcMode: true
        });
      }

      console.log("after", skill.name, currentSkillDmg, rotationFrames, character.ongoingEffects.map(e => e.name), this.ongoingSkills.map(s => s.name));
      rotationDmg += currentSkillDmg;
      rotationFrames += skill.timelineDurationFrames;
    }

    // for (let chunk of timeline.chunks) {
    //   const chunkCharacter = chunk
    //     .activeSkills[chunk.activeSkills.length - 1]
    //     .characterSnapshot;
    //
    //   for (let i = 0; i < chunk.activeSkills.length; i++) {
    //     const item = chunk.activeSkills[i];
    //     const chunkSkill = item.item as Skill;
    //     const skillItem = this.charactersSkills.find((s) => s.skill.name === chunkSkill.name);
    //     const character = chunkCharacter;
    //
    //     if (!skillItem) continue;
    //
    //     const skill = skillItem.skill;
    //     skill.customFrames = chunk.duration;
    //     ongoingSkills.push({startTime: frames, skill});
    //     character.ongoingEffects.forEach((b) => b.update(character, frames));
    //
    //     const dmg = skill.getDamage(character, frames, rotationSkills, i);
    //     totalRotationDmg += skill.skillTargetType === SkillTargetType.AOE && this.roster.enemiesCount !== 0
    //       ? dmg * this.roster.enemiesCount
    //       : dmg;
    //
    //     //run something if skill end
    //     ongoingSkills
    //       .filter((s) => s.startTime + (s.skill.customFrames ?? s.skill.frames) < frames)
    //       .forEach((s) => s.skill.strategy.runEndListener(character, frames));
    //
    //     //remove ended skills from active skills array
    //     ongoingSkills = ongoingSkills.filter((s) => !(s.startTime + (s.skill.customFrames ?? s.skill.frames) < frames));
    //     console.log(frames, skill.name, character.ongoingEffects.map(b => b.name), dmg, chunk.duration);
    //     frames += chunk.duration;
    //     rotationFrames += chunk.duration;
    //   }
    // }

    this.unsubscribeAllCharacters();
    return rotationDmg / (rotationFrames / 60);
  }
}
