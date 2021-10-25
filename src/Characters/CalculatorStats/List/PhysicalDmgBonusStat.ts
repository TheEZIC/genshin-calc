import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class PhysicalDmgBonusStat extends PureStat {
  calc(): number {
    const {physicalDmgBonus} = this.baseStats;
    const artifactsPhysicalPercent = this.artifacts.getStatSumByType(ArtifactStatType.PhysicalDmgBonus);

    return physicalDmgBonus.value + artifactsPhysicalPercent + this.additionalValuesSum;
  }
}