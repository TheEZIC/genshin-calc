import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class DendroResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { dendroResistance } = this.character.baseStats;

    return dendroResistance.value + this.getAdditionalValuesSum(skillFilter);
  }
}
