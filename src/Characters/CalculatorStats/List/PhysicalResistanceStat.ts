import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class PhysicalResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { physicalResistance } = this.character.baseStats;

    return physicalResistance.value + this.additionalValues.getSum(skillFilter);
  }
}
