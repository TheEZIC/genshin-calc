import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class GeoResistanceStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { geoResistance } = this.character.baseStats;

    return geoResistance.value + this.additionalValues.getSum(skillFilter);
  }
}
