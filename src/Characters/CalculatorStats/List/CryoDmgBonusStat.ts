import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class CryoDmgBonusStat extends PureStat {
  calc(): number {
    const {cryoDmgBonus} = this.baseStats;
    const artifactsCryoPercent = this.artifacts.getStatSumByType(ArtifactStatType.CryoDmgBonus);

    return cryoDmgBonus.value + artifactsCryoPercent + this.additionalValuesSum;
  }
}