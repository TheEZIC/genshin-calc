import EnemyPureStat from "@/Entities/Enemies/CalculatorStats/Types/EnemyPureStat";
import {SkillType} from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default abstract class EnemyDefStat extends EnemyPureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const sum = this.additionalValues.getSum(skillFilter, tenses);
    return sum < 90 ? sum : 90;
  }

  calcPure(): number {
    return this.calc();
  }
}
