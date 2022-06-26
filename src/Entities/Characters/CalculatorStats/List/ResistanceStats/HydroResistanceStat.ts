import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class HydroResistanceStat extends CharacterPureStat {
  public title: string = "HydroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { hydroResistance } = this.entity.baseStats;

    return hydroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { hydroResistance } = this.entity.baseStats;

    return hydroResistance.value;
  }
}
