import Skill from "./Skill";
import Character from "../Characters/Character";
import NormalSkill from "./NormalSkill";
import SummonSkill from "./SummonSkill";
import {SkillType} from "./SkillType";

export default class SkillsManager {
  constructor(
    private character: Character,
    private skills: Skill[],
  ) {
  }

  public changeLvl(lvl: number, skillType: SkillType) {
    this.skills
      .filter(s => s.type === skillType)
      .forEach(s => s.changeLvl(lvl));
  }

  public calcRotation(rotationSkills: Skill[]): number {
    let totalRotationDmg = 0;
    let totalFramesDuration = 0;

    for (let rotationSkill of rotationSkills) {
      const skill = this.skills.find(s => s.name === rotationSkill.name);

      if (skill) {
        skill.changeLvl(rotationSkill.lvl);
        totalRotationDmg += skill.calcDamage(this.character);

        if (skill instanceof NormalSkill) {
          totalFramesDuration += skill.frames;
        }

        if (skill instanceof SummonSkill) {
          totalFramesDuration += skill.summonUsageFrames;
        }
      }
    }

    return totalRotationDmg / (totalFramesDuration / 60);
  }
}