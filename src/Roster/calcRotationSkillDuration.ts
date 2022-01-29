import Skill from "@/Skills/Skill";
import NormalSkill from "@/Skills/NormalSkill";
import SummonSkill from "@/Skills/SummonSkill";
import {SkillType} from "@/Skills/SkillType";
import {ISkillsItem} from "@/Roster/Roster";

export default function calcRotationSkillDuration(
  skills: ISkillsItem[],
  rotationSkills: Skill[],
  rotationSkill: Skill,
  rotationSkillIndex: number,
): number {
  const skillItemIndex = skills.findIndex((s) => s.skill.name === rotationSkill.name);

  if (skillItemIndex === -1) return 0;

  const skillItem = skills[skillItemIndex];
  const nextSkill: Skill | undefined = skills[skillItemIndex + 1]?.skill;
  const prevSkill: Skill | undefined = skills[skillItemIndex - 1]?.skill;

  const { skill } = skillItem;
  let temp = 0;

  if (skill instanceof NormalSkill) {
    temp += skill.frames;
  }

  if (skill instanceof SummonSkill) {
    const remainingSkills = rotationSkills.slice(rotationSkillIndex + 1);
    const remainingSkillsFrames = remainingSkills.reduce((c, d) => c + d.frames, 0);

    temp += skill.summonUsageFrames;

    if (skill.summonDurationFrames > remainingSkillsFrames) {
      temp += skill.summonDurationFrames - remainingSkillsFrames;
    }
  }

  if (skill instanceof NormalSkill
    && nextSkill?.strategy.type === SkillType.Dash
    && skill.canBeCanceled
  ) {
    temp -= skill.frames - skill.canceledFrames;
  }

  return temp;
}
