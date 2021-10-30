import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class HydroDmgBonusStat extends PureStat {
  calc(): number {
    const {hydroDmgBonus} = this.baseStats;
    const artifactsHydroPercent = this.artifacts.getStatSumByType(StatType.HydroDmgBonus);

    return hydroDmgBonus.value + artifactsHydroPercent + this.additionalValuesSum;
  }
}