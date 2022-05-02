import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import {SkillType} from "@/Skills/SkillType";
import Stat from "@/Entities/Characters/CalculatorStats/Types/Stat";

export enum StatTense {
  Pre,
  Present,
  Post,
}

interface IStatControllerItem {
  tense: StatTense;
  stat: StatValue;
}

export default class StatController {
  constructor(
    private stat: Stat,
  ) {
  }

  protected values: IStatControllerItem[] = [];

  public add(statValue: StatValue, tense: StatTense = StatTense.Present): this {
    this.values.push({stat: statValue, tense});
    this.stat.onChange.notifyAll(this.stat.calc());
    return this;
  }

  public remove(statValue: StatValue): this {
    this.values = this.values.filter((p) => p.stat.value !== statValue.value);
    this.stat.onChange.notifyAll(this.stat.calc());
    return this;
  }

  public getPreSum(skillFilter?: SkillType) {
    return this.filterValuesAndSum(this.values, [StatTense.Pre], skillFilter);
  }

  public getPresentSum(skillFilter?: SkillType) {
    return this.filterValuesAndSum(this.values, [StatTense.Present], skillFilter);
  }

  public getPostSum(skillFilter?: SkillType) {
    return this.filterValuesAndSum(this.values, [StatTense.Post], skillFilter);
  }

  public getSum(skillFilter?: SkillType, tenses?: StatTense[]): number {
    return this.filterValuesAndSum(this.values, tenses, skillFilter);
  }

  private filterValuesAndSum(stats: IStatControllerItem[], tenses?: StatTense[], skillFilter?: SkillType): number {
    if (!skillFilter && !tenses) {
      return stats.reduce((a, b) => a + b.stat.value, 0);
    }

    const filtered: StatValue[] = [];

    for (let statItem of stats) {
      const hasFilter = skillFilter ? statItem.stat.skillFilters?.includes(skillFilter) : false;

      if ((skillFilter && hasFilter) || !skillFilter) {
        if (tenses && tenses.length && tenses?.includes(statItem.tense)) {
          filtered.push(statItem.stat);
        } else if (!(tenses && tenses.length)) {
          filtered.push(statItem.stat);
        }
      }
    }

    return filtered.reduce((a, b) => a + b.value, 0);
  }

  public clear(): this {
    this.values = [];
    return this;
  }
}
