import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class PhysicalDmgBonusStat extends PureStat {
  calc(): number {
    const {physicalDmgBonus} = this.baseStats;
    const artifactsPhysicalPercent = this.artifacts.getStatSumByType(StatType.PhysicalDmgBonus);

    return physicalDmgBonus.value + artifactsPhysicalPercent + this.additionalValuesSum;
  }
}