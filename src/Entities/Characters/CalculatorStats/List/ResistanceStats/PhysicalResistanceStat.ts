import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class PhysicalResistanceStat extends PureStat {
  public title: string = "PhysicalResistance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { physicalResistance } = this.character.baseStats;

    return physicalResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { physicalResistance } = this.character.baseStats;

    return physicalResistance.value;
  }
}
