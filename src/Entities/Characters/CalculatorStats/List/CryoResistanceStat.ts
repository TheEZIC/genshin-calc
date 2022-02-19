import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class CryoResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { cryoResistance } = this.character.baseStats;

    return cryoResistance.value + this.additionalValues.getSum(skillFilter);
  }
}
