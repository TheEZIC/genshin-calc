import CritStat from "../Types/CritStat";
import {StatType} from "../../../BaseStats/StatType";

export default class CritDamageStat extends CritStat {
  calc(): number {
    const {critDamage} = this.baseStats;
    const artifactsCritDamage = this.artifacts.getStatSumByType(StatType.CritDamage);

    return critDamage.value + artifactsCritDamage + this.additionalValuesSum;
  }
}