import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class DendroResistanceStat extends PureStat {
  public title: string = "DendroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { dendroResistance } = this.character.baseStats;

    return dendroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { dendroResistance } = this.character.baseStats;

    return dendroResistance.value;
  }
}
