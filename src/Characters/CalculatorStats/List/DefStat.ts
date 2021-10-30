import MainStat from "../Types/MainStat";
import {StatType} from "../../../BaseStats/StatType";

export default class DefStat extends MainStat {
  calc(): number {
    const {baseDEF, percentDEF} = this.baseStats;
    const artifactsFlatDEF = this.artifacts.getStatSumByType(StatType.FlatDEF);
    const artifactsPercentDEF = this.artifacts.getStatSumByType(StatType.PercentDEF);

    return (baseDEF.value)
      * (1 + (percentDEF.value + artifactsPercentDEF + this.prefixesSum) / 100
        + artifactsFlatDEF
        + this.additionalValuesSum)
      * (1 + (this.affixesSum) / 100);
  }
}