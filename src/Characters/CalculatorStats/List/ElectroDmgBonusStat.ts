import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class ElectroDmgBonusStat extends PureStat {
  calc(): number {
    const {electroDmgBonus} = this.baseStats;
    const artifactsElectroPercent = this.artifacts.getStatSumByType(StatType.ElectroDmgBonus);

    return electroDmgBonus.value + artifactsElectroPercent + this.additionalValuesSum;
  }
}