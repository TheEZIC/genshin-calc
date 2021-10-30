import PureStat from "./PureStat";

export default abstract class MainStat extends PureStat {
  protected prefixes: number[] = [];

  /**
   * Add prefix to stat
   * (ATK%, DEF% etc..)
   * @param {number} prefix - prefix value
   * @return {MainStat} - this
   * */
  public addPrefix(prefix: number): this {
    this.prefixes.push(prefix);
    return this;
  }

  /**
   * Remove prefix from stat
   * (ATK%, DEF% etc..)
   * @param {number} prefix - prefix value
   * @return {MainStat} - this
   * */
  public removePrefix(prefix: number): this {
    this.prefixes = this.prefixes.filter(p => p !== prefix);
    return this;
  }

  /**
   * Prefixes sum
   * (ATK%, DEF% etc..)
   * @return {number} - sum
   * */
  public get prefixesSum(): number {
    return this.prefixes.reduce((a, b) => a + b, 0);
  }

  protected affixes: number[] = [];

  /**
   * Add affix to stat
   * @param {number} affix - affix value
   * @return {MainStat} - this
   * */
  public addAffix(affix: number) {
    this.affixes.push(affix);
    return this;
  }

  /**
   * Remove affix from stat
   * @param {number} affix - affix value
   * @return {MainStat} - this
   * */
  public removeAffix(affix: number): this {
    this.prefixes = this.prefixes.filter(p => p !== affix);
    return this;
  }

  /**
   * Affixes sum
   * @return {number} - sum
   * */
  public get affixesSum(): number {
    return this.affixes.reduce((a, b) => a + b, 0);
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