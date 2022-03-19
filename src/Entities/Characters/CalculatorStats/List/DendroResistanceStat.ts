import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class DendroResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { dendroResistance } = this.character.baseStats;

    return dendroResistance.value + this.additionalValues.getSum(skillFilter);
  }
}