import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class PyroDmgBonusStat extends PureStat {
  calc(): number {
    const {pyroDmgBonus} = this.baseStats;
    const artifactsPyroPercent = this.artifacts.getStatSumByType(StatType.PyroDmgBonus);

    return pyroDmgBonus.value + artifactsPyroPercent + this.additionalValuesSum;
  }
}