import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class ElectroResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { electroResistance } = this.character.baseStats;

    return electroResistance.value + this.additionalValues.getSum(skillFilter);
  }
}
