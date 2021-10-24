import CalculatorStats from "../CalculatorStats";

export default abstract class Stat {
  protected baseStats = this.calculator.character.baseStats;
  protected artifacts = this.calculator.character.artifacts;
  protected weapon = null;

  constructor(
    protected calculator: CalculatorStats,
  ) {
  }

  public abstract calc(): number;
  public clear(): this {
    return this;
  };

  public get value() {
    const result =  this.calc();
    this.clear();
    return result;
  }
}