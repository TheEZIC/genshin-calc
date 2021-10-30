import MainStat from "../Types/MainStat";
import {StatType} from "../../../BaseStats/StatType";

export default class HpStat extends MainStat {
  calc(): number {
    const {baseHP, percentHP} = this.baseStats;
    const artifactsFlatHP = this.artifacts.getStatSumByType(StatType.FlatHP);
    const artifactsPercentHP = this.artifacts.getStatSumByType(StatType.PercentHP);

    return (baseHP.value)
      * (1 + (percentHP.value + artifactsPercentHP + this.prefixesSum) / 100
        + artifactsFlatHP
        + this.additionalValuesSum)
      * (1 + (this.affixesSum) / 100);
  }
}