import {ISkill} from "@/Skills/SkillInterfaces/ISkill";

export interface ISingleSkill extends ISkill {
}

export function isIBurstSKill(obj: any): obj is ISingleSkill {
  return true;
}
