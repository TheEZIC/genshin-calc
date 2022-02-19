import { SkillType } from "@/Skills/SkillType";

import Stat from "./Stat";
import { StatValue } from "./StatValue";
import StatController from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default abstract class PureStat extends Stat {
  public readonly additionalValues: StatController = new StatController();

  /**
   * Remove all additional values
   * @return {PureStat} - this
   * */
  public override clear(): this {
    this.additionalValues.clear();
    return this;
  }
}
