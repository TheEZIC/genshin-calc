import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class PyroResistanceStat extends CharacterPureStat {
  public title: string = "PyroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { pyroResistance } = this.entity.baseStats;

    return pyroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { pyroResistance } = this.entity.baseStats;

    return pyroResistance.value;
  }
}
