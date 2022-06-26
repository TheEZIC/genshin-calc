import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class AnemoResistanceStat extends CharacterPureStat {
  public title: string = "AnemoResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { anemoResistance } = this.entity.baseStats;

    return anemoResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { anemoResistance } = this.entity.baseStats;

    return anemoResistance.value;
  }
}
