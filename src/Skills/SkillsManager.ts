import Character from "@/Characters/Character";

import NormalSkill from "./NormalSkill";
import Skill from "./Skill";
import { SkillType } from "./SkillType";
import SummonSkill from "./SummonSkill";

export default class SkillsManager {
  constructor(private character: Character, private skills: Skill[]) {}

  public changeLvl(lvl: number, skillType: SkillType) {
    this.skills
      .filter((s) => s.type === skillType)
      .forEach((s) => s.changeLvl(lvl));
  }

  public getSkillByType(skillType: SkillType) {
    return this.skills.find((s) => s.type === skillType);
  }

  public calcRotation(rotationSkills: Skill[]): number {
    let totalRotationDmg = 0;
    let totalFramesDuration = 0;
    let index = 0;

    for (let rotationSkill of rotationSkills) {
      const skill = this.skills.find((s) => s.name === rotationSkill.name);

      if (skill) {
        totalRotationDmg += skill.getDamage(this.character);

        if (skill instanceof NormalSkill) {
          totalFramesDuration += skill.frames;
        }

        if (skill instanceof SummonSkill) {
          const remainingSkills = rotationSkills.slice(index + 1);
          const remainingSkillsFrames = remainingSkills.reduce(
            (a, b) => a + b.frames,
            0
          );

          totalFramesDuration += skill.summonUsageFrames;

          if (skill.summonDurationFrames > remainingSkillsFrames) {
            totalFramesDuration +=
              skill.summonDurationFrames - remainingSkillsFrames;
          }
        }
      }

      index++;
    }

    return totalRotationDmg / (totalFramesDuration / 60);
  }
}
