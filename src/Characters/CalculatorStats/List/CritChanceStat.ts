import CritStat from "../Types/CritStat";
import {StatType} from "../../../BaseStats/StatType";

export default class CritChanceStat extends CritStat {
  calc(): number {
    const {critChance} = this.baseStats;
    const artifactsCritChance = this.artifacts.getStatSumByType(StatType.CritChance);

    return critChance.value + artifactsCritChance + this.additionalValuesSum;
  }
}