import PureStat from "./PureStat";
import StatController from "@/Characters/CalculatorStats/Types/StatController";

export default abstract class MainStat extends PureStat {
  public readonly prefixes: StatController = new StatController();
  public readonly affixes: StatController = new StatController();

  /**
   * Remove all affixes, prefixes and additional values
   * @return {MainStat} - this
   * */
  public override clear(): this {
    super.clear();
    this.prefixes.clear();
    this.affixes.clear();
    return this;
  }
}
