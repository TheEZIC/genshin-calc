import PureStat from "./PureStat";

export default abstract class MainStat extends PureStat {
  protected prefixes: number[] = [];

  public addPrefix(prefix: number): this {
    this.prefixes.push(prefix);
    return this;
  }

  public get prefixesSum() {
    return this.prefixes.reduce((a, b) => a + b, 0);
  }

  protected affixes: number[] = [];

  public addAffix(affix: number) {
    this.affixes.push(affix);
    return this;
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