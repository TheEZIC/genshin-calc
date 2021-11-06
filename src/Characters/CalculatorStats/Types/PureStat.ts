import { SkillType } from "@/Skills/SkillType";

import Stat from "./Stat";
import { StatValue } from "./StatValue";

export default abstract class PureStat extends Stat {
  private additionalValues: StatValue[] = [];

  /**
   * Add additional value
   * (ER, Elem dmg, crits, flat and etc)
   * @param {StatValue} additionalValue - additional value to add
   * @return {PureStat} - this
   * */
  public addAdditionalValue(additionalValue: StatValue): this {
    this.additionalValues.push(additionalValue);
    return this;
  }

  /**
   * Remove additional value
   * (ER, Elem dmg, crits, flat and etc)
   * @param {StatValue} additionalValue - additional value to remove
   * @return {PureStat} - this
   * */
  public removeAdditionalValue(additionalValue: StatValue): this {
    this.additionalValues = this.additionalValues.filter((v) => v.value !== additionalValue.value);
    return this;
  }

  /**
   * Sum af additional values
   * (ER, Elem dmg, crits, flat and etc)
   * @return {number} - this
   * */
  public getAdditionalValuesSum(skillFilter?: SkillType): number {
    return this.filterValuesAndSum(this.additionalValues, skillFilter);
  }

  protected filterValuesAndSum(stats: StatValue[], skillFilter?: SkillType) {
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

  /**
   * Remove all additional values
   * @return {PureStat} - this
   * */
  public override clear(): this {
    this.additionalValues = [];
    return this;
  }
}
