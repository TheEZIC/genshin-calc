import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class GeoDmgBonusStat extends PureStat {
  calc(): number {
    const {geoDmgBonus} = this.baseStats;
    const artifactsGeoPercent = this.artifacts.getStatSumByType(StatType.GeoDmgBonus);

    return geoDmgBonus.value + artifactsGeoPercent + this.additionalValuesSum;
  }
}