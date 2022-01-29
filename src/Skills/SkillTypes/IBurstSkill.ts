import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";

export interface IBurstSkill {
  strategy: BurstSkillStrategy;
  energyCost: number;
}
