import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class PhysicalResistanceStat extends CharacterPureStat {
  public title: string = "PhysicalResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { physicalResistance } = this.entity.baseStats;

    return physicalResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { physicalResistance } = this.entity.baseStats;

    return physicalResistance.value;
  }
}
