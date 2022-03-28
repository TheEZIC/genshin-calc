import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class GeoResistanceStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { geoResistance } = this.character.baseStats;

    return geoResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { geoResistance } = this.character.baseStats;

    return geoResistance.value;
  }
}
