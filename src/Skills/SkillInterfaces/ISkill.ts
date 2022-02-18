import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {IGetDamageArgs} from "@/Skills/Skill";

export interface ISkill {
  frames: number;
  countdownFrames: number;
  targetType: SkillTargetType;
  damageRegistrationType: SkillDamageRegistrationType;
  lvl: number;
  getDamage(args: IGetDamageArgs): number;
}
