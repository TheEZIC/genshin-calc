import MainStat from "../MainStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class AtkStat extends MainStat {
  calc(): number {
    const {baseATK, percentATK} = this.baseStats;
    const artifactsFlatATK = this.artifacts.getStatSumByType(ArtifactStatType.FlatATK);
    const artifactsPercentATK = this.artifacts.getStatSumByType(ArtifactStatType.PercentATK);

    return (baseATK.value)
      * (1 + percentATK.value + artifactsPercentATK + this.prefixesSum)
      * (this.affixesSum)
      + artifactsFlatATK;
  }
}