import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class PyroResistanceStat extends PureStat {
  public title: string = "PyroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { pyroResistance } = this.character.baseStats;

    return pyroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { pyroResistance } = this.character.baseStats;

    return pyroResistance.value;
  }
}
