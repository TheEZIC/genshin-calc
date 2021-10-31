import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class DendroDmgBonusStat extends PureStat {
  calc(): number {
    const {dendroDmgBonus} = this.character.baseStats;
    const artifactsDendroPercent = this.getArtifactsValue(StatType.DendroDmgBonus);

    return dendroDmgBonus.value + artifactsDendroPercent + this.additionalValuesSum;
  }
}