import CharacterStat from "@/Entities/Characters/CalculatorStats/Types/CharacterStat";
import StatController from "@/CalculatorStats/StatController";

export default abstract class CharacterPureStat extends CharacterStat {
  public readonly additionalValues: StatController = new StatController(this);

  public override calcDisplayed(): number {
    return this.calc();
  }

  /**
   * Remove all additional values
   * @return {PureStat} - this
   * */
  public override clear(): this {
    this.additionalValues.clear();
    return this;
  }
}
