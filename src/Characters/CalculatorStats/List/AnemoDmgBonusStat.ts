import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class AnemoDmgBonusStat extends PureStat {
  calc(): number {
    const {anemoDmgBonus} = this.baseStats;
    const artifactsAnemoPercent = this.artifacts.getStatSumByType(StatType.AnemoDmgBonus);

    return anemoDmgBonus.value + artifactsAnemoPercent + this.additionalValuesSum;
  }
}