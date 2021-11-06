import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class PyroResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { pyroResistance } = this.character.baseStats;

    return pyroResistance.value + this.getAdditionalValuesSum(skillFilter);
  }
}
