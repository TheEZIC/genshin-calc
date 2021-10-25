import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class HydroDmgBonusStat extends PureStat {
  calc(): number {
    const {hydroDmgBonus} = this.baseStats;
    const artifactsHydroPercent = this.artifacts.getStatSumByType(ArtifactStatType.HydroDmgBonus);

    return hydroDmgBonus.value + artifactsHydroPercent + this.additionalValuesSum;
  }
}