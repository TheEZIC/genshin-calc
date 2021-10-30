import MainStat from "../Types/MainStat";
import {StatType} from "../../../BaseStats/StatType";

export default class AtkStat extends MainStat {
  calc(): number {
    const {baseATK, percentATK} = this.baseStats;
    const artifactsFlatATK = this.artifacts.getStatSumByType(StatType.FlatATK);
    const artifactsPercentATK = this.artifacts.getStatSumByType(StatType.PercentATK);
    const weaponPercentATK: number = this.weapon?.mainStat.isType(StatType.PercentATK)
      ? this.weapon?.mainStat.value
      : 0;

    return (baseATK.value + (this.weapon?.baseATK.value ?? 0))
      * (1 + (percentATK.value + artifactsPercentATK + weaponPercentATK + this.prefixesSum) / 100
        + artifactsFlatATK
        + this.additionalValuesSum)
      * (1 + (this.affixesSum) / 100);
  }
}