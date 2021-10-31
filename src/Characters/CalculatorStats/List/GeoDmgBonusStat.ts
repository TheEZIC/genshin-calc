import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class GeoDmgBonusStat extends PureStat {
  calc(): number {
    const {geoDmgBonus} = this.character.baseStats;
    const artifactsGeoPercent = this.getArtifactsValue(StatType.GeoDmgBonus);

    return geoDmgBonus.value + artifactsGeoPercent + this.additionalValuesSum;
  }
}