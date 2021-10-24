import CalculatorStats from "./CalculatorStats";

export default abstract class Stat {
  protected baseStats = this.calculator.character.baseStats;
  protected artifacts = this.calculator.character.artifacts;
  protected weapon = null;

  constructor(
    protected calculator: CalculatorStats,
  ) {
  }

  abstract calc(): number;

  public get value() {
    return this.calc();
  }
}