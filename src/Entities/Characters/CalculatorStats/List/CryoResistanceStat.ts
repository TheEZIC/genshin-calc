import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class CryoResistanceStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { cryoResistance } = this.character.baseStats;

    return cryoResistance.value + this.additionalValues.getSum(skillFilter, tenses);
  }

  calcPure(): number {
    const { cryoResistance } = this.character.baseStats;

    return cryoResistance.value;
  }
}
