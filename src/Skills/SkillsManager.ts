import Skill from "./Skill";
import Character from "../Characters/Character";
import NormalSkill from "./NormalSkill";
import SummonSkill from "./SummonSkill";

export default class SkillsManager {
  constructor(
    private character: Character,
    private skills: Skill[],
  ) {
  }

  public calcRotation(rotationSkills: Skill[]): number {
    let totalRotationDmg = 0;
    let totalFramesDuration = 0;

    for (let rotationSkill of rotationSkills) {
      const skill = this.skills.find(s => s.name === rotationSkill.name);

      if (skill) {
        totalRotationDmg += skill.calcDamage(this.character);

        if (skill instanceof NormalSkill) {
          totalFramesDuration += skill.frames;
        }

        if (skill && skill instanceof SummonSkill) {
          totalFramesDuration += skill.summonUsageFrames;
        }
      }
    }

    return totalRotationDmg / (totalFramesDuration / 60);
  }
}