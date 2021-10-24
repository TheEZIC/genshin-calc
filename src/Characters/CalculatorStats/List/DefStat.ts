import MainStat from "../MainStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class DefStat extends MainStat {
  calc(): number {
    const {baseDEF, percentDEF} = this.baseStats;
    const artifactsFlatDEF = this.artifacts.getStatSumByType(ArtifactStatType.FlatDEF);
    const artifactsPercentDEF = this.artifacts.getStatSumByType(ArtifactStatType.PercentDEF);

    return (baseDEF.value)
      * (1 + (percentDEF.value + artifactsPercentDEF + this.prefixesSum) / 100)
      * (1 + (this.affixesSum) / 100)
      + artifactsFlatDEF;
  }
}