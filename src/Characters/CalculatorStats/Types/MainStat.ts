import { SkillType } from "@/Skills/SkillType";

import PureStat from "./PureStat";
import { StatValue } from "./StatValue";

export default abstract class MainStat extends PureStat {
  protected prefixes: StatValue[] = [];

  /**
   * Add prefix to stat
   * (ATK%, DEF% etc..)
   * @param {StatValue} prefix - prefix value
   * @return {MainStat} - this
   * */
  public addPrefix(prefix: StatValue): this {
    this.prefixes.push(prefix);
    return this;
  }

  /**
   * Remove prefix from stat
   * (ATK%, DEF% etc..)
   * @param {StatValue} prefix - prefix value
   * @return {MainStat} - this
   * */
  public removePrefix(prefix: StatValue): this {
    this.prefixes = this.prefixes.filter((p) => p.value !== prefix.value);
    return this;
  }

  /**
   * Prefixes sum
   * (ATK%, DEF% etc..)
   * @return {number} - sum
   * */
  public getPrefixesSum(skillFilter?: SkillType): number {
    return this.filterValuesAndSum(this.prefixes, skillFilter);
  }

  protected affixes: StatValue[] = [];

  /**
   * Add affix to stat
   * @param {StatValue} affix - affix value
   * @return {MainStat} - this
   * */
  public addAffix(affix: StatValue) {
    this.affixes.push(affix);
    return this;
  }

  /**
   * Remove affix from stat
   * @param {StatValue} affix - affix value
   * @return {MainStat} - this
   * */
  public removeAffix(affix: StatValue): this {
    this.affixes = this.affixes.filter((p) => p.value !== affix.value);
    return this;
  }

  /**
   * Affixes sum
   * @return {number} - sum
   * */
  public getAffixesSum(skillFilter?: SkillType): number {
    return this.filterValuesAndSum(this.affixes, skillFilter);
  }

  /**
   * Remove all affixes, prefixes and additional values
   * @return {MainStat} - this
   * */
  public override clear(): this {
    super.clear();
    this.prefixes = [];
    this.affixes = [];
    return this;
  }
}
