import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class GeoResistanceStat extends CharacterPureStat {
  public title: string = "GeoResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { geoResistance } = this.entity.baseStats;

    return geoResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { geoResistance } = this.entity.baseStats;

    return geoResistance.value;
  }
}
