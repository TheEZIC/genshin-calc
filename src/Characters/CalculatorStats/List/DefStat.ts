import MainStat from "../Types/MainStat";
import {StatType} from "../../../BaseStats/StatType";

export default class DefStat extends MainStat {
  calc(): number {
    const {baseDEF, percentDEF} = this.character.baseStats;
    const artifactsFlatDEF = this.getArtifactsValue(StatType.FlatDEF);
    const artifactsPercentDEF = this.getArtifactsValue(StatType.PercentDEF);

    return (baseDEF.value)
      * (1 + (percentDEF.value + artifactsPercentDEF + this.prefixesSum) / 100
        + artifactsFlatDEF
        + this.additionalValuesSum)
      * (1 + (this.affixesSum) / 100);
  }
}