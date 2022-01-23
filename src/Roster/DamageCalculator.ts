import Skill from "@/Skills/Skill";
import NormalSkill from "@/Skills/NormalSkill";
import SummonSkill from "@/Skills/SummonSkill";
import {SkillType} from "@/Skills/SkillType";
import Character from "@/Characters/Character";
import Roster from "@/Roster/Roster";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import calcRotationSkillDuration from "@/Roster/calcRotationSkillDuration";
import Timeline from "@/Roster/Timeline";

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

  private getCharactersSkills(): ISkillsItem[] {
    return this.roster.characters.map((char) => char.skillManager.allSkills.map((s) => ({ skill: s, character: char }))).flat();
  }

  public calcRotation(rotationSkills: Skill[]): number {
    const rosterSkills: ISkillsItem[] = this.getCharactersSkills();

    let ongoingSkills: IOngoingSkill[] = [];
    let totalRotationDmg: number = 0
    let rotationFrames: number = 0;
    let frames: number = 0;

    const timeline = new Timeline(rotationSkills, rosterSkills);

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = rosterSkills.find((s) => s.skill.name === rotationSkill.name);

      if (!skillItem) continue;

      const {skill, character} = skillItem;

      ongoingSkills.push({startTime: frames, skill});
      character.ongoingEffects.forEach((b) => b.update(character, frames));

      const dmg = skill.getDamage(character, frames, rotationSkills, i);

      totalRotationDmg += skill.skillTargetType === SkillTargetType.AOE && this.roster.enemiesCount !== 0
        ? dmg * this.roster.enemiesCount
        : dmg;

      //run something if skill end
      ongoingSkills
        .filter((s) => s.startTime + s.skill.frames < frames)
        .forEach((s) => s.skill.strategy.runEndListener(character, frames));

      //remove ended skills from active skills array
      ongoingSkills = ongoingSkills.filter((s) => !(s.startTime + s.skill.frames < frames));
      console.log(frames, skill.name, character.ongoingEffects.map(b => b.name));
      frames += skill.timelineDurationFrames;
      rotationFrames += calcRotationSkillDuration(rosterSkills, rotationSkills, rotationSkill, i);
    }

    return totalRotationDmg / (rotationFrames / 60);
  }
}
