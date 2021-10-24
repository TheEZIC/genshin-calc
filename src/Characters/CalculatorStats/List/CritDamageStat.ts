import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class CritDamageStat extends PureStat {
  calc(): number {
    const {critDamage} = this.baseStats;
    const artifactsCritDamage = this.artifacts.getStatSumByType(ArtifactStatType.CritDamage);

    return critDamage.value + artifactsCritDamage + this.additionalValuesSum;
  }
}