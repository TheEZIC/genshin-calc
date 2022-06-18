import Stat from "./Stat";
import StatController from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default abstract class PureStat extends Stat {
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
