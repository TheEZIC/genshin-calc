import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class HydroResistanceStat extends PureStat {
  public title: string = "HydroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { hydroResistance } = this.character.baseStats;

    return hydroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { hydroResistance } = this.character.baseStats;

    return hydroResistance.value;
  }
}
