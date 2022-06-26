import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class DendroResistanceStat extends CharacterPureStat {
  public title: string = "DendroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { dendroResistance } = this.entity.baseStats;

    return dendroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { dendroResistance } = this.entity.baseStats;

    return dendroResistance.value;
  }
}
