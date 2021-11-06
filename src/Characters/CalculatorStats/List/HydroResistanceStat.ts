import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class HydroResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { hydroResistance } = this.character.baseStats;

    return hydroResistance.value + this.getAdditionalValuesSum(skillFilter);
  }
}
