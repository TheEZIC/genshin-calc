import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import {SkillType} from "@/Skills/SkillType";

export default class StatController {
  protected values: StatValue[] = [];

  public add(prefix: StatValue): this {
    this.values.push(prefix);
    return this;
  }

  public remove(prefix: StatValue): this {
    this.values = this.values.filter((p) => p.value !== prefix.value);
    return this;
  }

  public getSum(skillFilter?: SkillType): number {
    return this.filterValuesAndSum(this.values, skillFilter);
  }

  public clear(): this {
    this.values = [];
    return this;
  }

  private filterValuesAndSum(stats: StatValue[], skillFilter?: SkillType): number {
    if (!skillFilter) {
      return stats.reduce((a, b) => a + b.value, 0);
    }

    const filtered: StatValue[] = [];

    for (let stat of stats) {
      const hasFilter = stat.skillFilters?.includes(skillFilter);
      if (!stat.skillFilters || hasFilter) {
        filtered.push(stat);
      }
    }

    return filtered.reduce((a, b) => a + b.value, 0);
  }
}
