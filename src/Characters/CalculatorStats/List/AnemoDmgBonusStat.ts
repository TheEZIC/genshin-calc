import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class AnemoDmgBonusStat extends PureStat {
  calc(): number {
    const {anemoDmgBonus} = this.baseStats;
    const artifactsAnemoPercent = this.artifacts.getStatSumByType(ArtifactStatType.AnemoDmgBonus);

    return anemoDmgBonus.value + artifactsAnemoPercent + this.additionalValuesSum;
  }
}