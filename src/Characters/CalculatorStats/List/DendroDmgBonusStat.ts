import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class DendroDmgBonusStat extends PureStat {
  calc(): number {
    const {dendroDmgBonus} = this.baseStats;
    const artifactsDendroPercent = this.artifacts.getStatSumByType(ArtifactStatType.DendroDmgBonus);

    return dendroDmgBonus.value + artifactsDendroPercent + this.additionalValuesSum;
  }
}