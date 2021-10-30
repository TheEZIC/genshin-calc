import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class CryoDmgBonusStat extends PureStat {
  calc(): number {
    const {cryoDmgBonus} = this.baseStats;
    const artifactsCryoPercent = this.artifacts.getStatSumByType(StatType.CryoDmgBonus);

    return cryoDmgBonus.value + artifactsCryoPercent + this.additionalValuesSum;
  }
}