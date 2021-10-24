import CalculatorStats from "./CalculatorStats";

export default abstract class MainStat {
  constructor(
    private calculator: CalculatorStats,
  ) {
  }

  protected baseStats = this.calculator.character.baseStats;
  protected artifacts = this.calculator.character.artifacts;
  protected weapon = null;

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

  public clear(): this {
    this.prefixes = [];
    this.affixes = [];
    return this;
  }

  abstract calc(): number;

  get value() {
    const result = this.calc();
    this.clear();
    return result;
  }
}