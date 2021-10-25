import CritStat from "../Types/CritStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class CritDamageStat extends CritStat {
  calc(): number {
    const {critDamage} = this.baseStats;
    const artifactsCritDamage = this.artifacts.getStatSumByType(ArtifactStatType.CritDamage);

    return critDamage.value + artifactsCritDamage + this.additionalValuesSum;
  }
}