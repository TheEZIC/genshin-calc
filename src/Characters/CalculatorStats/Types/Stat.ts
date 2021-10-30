import CalculatorStats from "../CalculatorStats";

export default abstract class Stat {
  protected baseStats = this.calculator.character.baseStats;
  protected artifacts = this.calculator.character.artifactsManager;
  protected weapon = this.calculator.character.weaponManager.weapon;

  constructor(
    protected calculator: CalculatorStats,
  ) {
  }

  /**
   * Calc this stat value
   * @return {number} - calculated value
   * */
  public abstract calc(): number;

  /**
   * Clear this stat
   * @return {Stat} - this
   * */
  public clear(): this {
    return this;
  };

  /**
   * Get value and clear all prefixes/affixes/additional
   * @return {Stat} - this
   * */
  public get value() {
    const result =  this.calc();
    this.clear();
    return result;
  }
}