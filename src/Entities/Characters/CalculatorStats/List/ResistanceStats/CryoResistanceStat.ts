import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class CryoResistanceStat extends CharacterPureStat {
  public title: string = "CryoResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { cryoResistance } = this.entity.baseStats;

    return cryoResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { cryoResistance } = this.entity.baseStats;

    return cryoResistance.value;
  }
}
