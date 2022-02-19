import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class AnemoResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { anemoResistance } = this.character.baseStats;

    return anemoResistance.value + this.additionalValues.getSum(skillFilter);
  }
}
