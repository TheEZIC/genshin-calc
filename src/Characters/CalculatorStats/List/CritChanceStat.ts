import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class CritChanceStat extends PureStat {
  calc(): number {
    const {critChance} = this.baseStats;
    const artifactsCritChance = this.artifacts.getStatSumByType(ArtifactStatType.CritChance);

    return critChance.value + artifactsCritChance + this.additionalValuesSum;
  }
}