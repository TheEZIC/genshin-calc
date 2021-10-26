import PureStat from "./PureStat";

export default abstract class MainStat extends PureStat {
  protected prefixes: number[] = [];

  public addPrefix(prefix: number): this {
    this.prefixes.push(prefix);
    return this;
  }

  public removePrefix(prefix: number) {
    this.prefixes = this.prefixes.filter(p => p !== prefix);
  }

  public get prefixesSum() {
    return this.prefixes.reduce((a, b) => a + b, 0);
  }

  protected affixes: number[] = [];

  public addAffix(affix: number) {
    this.affixes.push(affix);
    return this;
  }

  public removeAffix(affix: number) {
    this.prefixes = this.prefixes.filter(p => p !== affix);
  }

  public get affixesSum() {
    return this.affixes.reduce((a, b) => a + b, 0);
  }

  public override clear(): this {
    super.clear();
    this.prefixes = [];
    this.affixes = [];
    return this;
  }
}