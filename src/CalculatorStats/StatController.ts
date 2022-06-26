import {StatValue} from "@/CalculatorStats/StatValue";
import {SkillType} from "@/Skills/SkillType";
import Stat from "@/CalculatorStats/Stat";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";
import Entity from "@/Entities/Entity";

export enum StatTense {
  Pre,
  Present,
  Post,
}

interface IStatControllerItem {
  tense: StatTense;
  stat: StatValue;
}

@RefreshableClass
export default class StatController {
  constructor(
    private stat: Stat<Entity>,
  ) {
  }

  @RefreshableProperty([])
  protected values: IStatControllerItem[] = [];

  public add(statValue: StatValue, tense: StatTense = StatTense.Present): this {
    if (statValue.value === 0) return this;
    this.values.push({stat: statValue, tense});
    this.stat.onChange.notifyAll(this.stat.calc());
    return this;
  }

  public remove(statValue: StatValue): this {
    const index = this.values.findIndex((value) => value.stat.value === statValue.value);

    if (index !== -1) {
      this.values.splice(index);
      this.stat.onChange.notifyAll(this.stat.calc());
    }

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
      const statHasFilter = skillFilter
        ? statItem.stat.skillFilters?.includes(skillFilter) || !statItem.stat.skillFilters?.length
        : false;

      if ((skillFilter && statHasFilter) || !skillFilter) {
        if (tenses && tenses.length && tenses.includes(statItem.tense)) {
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
