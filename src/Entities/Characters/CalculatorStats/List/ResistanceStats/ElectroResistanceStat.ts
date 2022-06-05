import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class ElectroResistanceStat extends PureStat {
  public title: string = "ElectroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { electroResistance } = this.character.baseStats;

    return electroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { electroResistance } = this.character.baseStats;

    return electroResistance.value;
  }
}
