import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class ElectroResistanceStat extends CharacterPureStat {
  public title: string = "ElectroResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { electroResistance } = this.entity.baseStats;

    return electroResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { electroResistance } = this.entity.baseStats;

    return electroResistance.value;
  }
}
