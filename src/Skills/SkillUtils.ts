import {ISkillActionArgs, IGetDamageArgs} from "@/Skills/Skill";

export function convertGetDamageToCalcDamageArgs(args: IGetDamageArgs): ISkillActionArgs {
  const {skills, currentSkillIndex, character, behavior} = args;

  const prevSkill = skills[currentSkillIndex - 1] ?? null;
  const nextSkill = skills[currentSkillIndex + 1] ?? null;
  const prevSkills = skills.filter((s, i) => i < currentSkillIndex);
  const nextSkills = skills.filter((s, i) => i > currentSkillIndex);

  return {character, prevSkill, nextSkill, prevSkills, nextSkills, behavior, value: 0};
}
