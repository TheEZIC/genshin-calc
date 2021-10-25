import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class GeoDmgBonusStat extends PureStat {
  calc(): number {
    const {geoDmgBonus} = this.baseStats;
    const artifactsGeoPercent = this.artifacts.getStatSumByType(ArtifactStatType.GeoDmgBonus);

    return geoDmgBonus.value + artifactsGeoPercent + this.additionalValuesSum;
  }
}