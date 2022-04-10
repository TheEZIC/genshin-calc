import {ISkill} from "@/Skills/SkillInterfaces/ISkill";
import {ISkillActionArgs} from "@/Skills/Skill";

export interface IDOTSkill extends ISkill {
  damageFrames: number[];
}

export function isIDOTSkill(obj: any): obj is IDOTSkill {
  return Boolean(obj["damageFrames"]);
}
