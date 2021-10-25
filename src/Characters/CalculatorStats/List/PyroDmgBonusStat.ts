import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class PyroDmgBonusStat extends PureStat {
  calc(): number {
    const {pyroDmgBonus} = this.baseStats;
    const artifactsPyroPercent = this.artifacts.getStatSumByType(ArtifactStatType.PyroDmgBonus);

    return pyroDmgBonus.value + artifactsPyroPercent + this.additionalValuesSum;
  }
}