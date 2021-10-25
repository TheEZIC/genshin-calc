import MainStat from "../Types/MainStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class HpStat extends MainStat {
  calc(): number {
    const {baseHP, percentHP} = this.baseStats;
    const artifactsFlatHP = this.artifacts.getStatSumByType(ArtifactStatType.FlatHP);
    const artifactsPercentHP = this.artifacts.getStatSumByType(ArtifactStatType.PercentHP);

    return (baseHP.value)
      * (1 + (percentHP.value + artifactsPercentHP + this.prefixesSum) / 100 + artifactsFlatHP)
      * (1 + (this.affixesSum) / 100);
  }
}