import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";

export interface IBurstSkill {
  strategy: BurstSkillStrategy;
  energyCost: number;
  energyConsumed: number;
}

export function isIBurstSKill(obj: any): obj is IBurstSkill {
  return Boolean(obj["energyCost"] && obj["strategy"] instanceof BurstSkillStrategy);
}
