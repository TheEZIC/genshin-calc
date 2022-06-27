import EnemyPureStat from "@/Entities/Enemies/CalculatorStats/Types/EnemyPureStat";
import {SkillType} from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default abstract class EnemyResistanceStat extends EnemyPureStat {
  public calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const sum = this.additionalValues.getSum(skillFilter, tenses) / 100;
    let value: number = 0;

    if (sum < 0) {
      value = 1 - (sum / 2);
    } else if (sum >= 0 && sum < 0.75) {
      value = 1 - sum;
    } else if (sum >= 0.75) {
      value = 1 / (4 * sum + 1);
    }

    return value;
  }

  public calcPure(): number {
    return this.calc();
  }
}
