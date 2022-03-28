import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class AnemoResistanceStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { anemoResistance } = this.character.baseStats;

    return anemoResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { anemoResistance } = this.character.baseStats;

    return anemoResistance.value;
  }
}
