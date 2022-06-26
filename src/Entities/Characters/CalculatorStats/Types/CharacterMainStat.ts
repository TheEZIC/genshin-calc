import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import StatController from "@/CalculatorStats/StatController";

export default abstract class CharacterMainStat extends CharacterPureStat {
  public readonly prefixes: StatController = new StatController(this);
  public readonly affixes: StatController = new StatController(this);

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
