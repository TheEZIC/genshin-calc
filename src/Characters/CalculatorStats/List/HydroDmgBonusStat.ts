import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class HydroDmgBonusStat extends PureStat {
  calc(): number {
    const {hydroDmgBonus} = this.character.baseStats;
    const artifactsHydroPercent = this.getArtifactsValue(StatType.HydroDmgBonus);

    return hydroDmgBonus.value + artifactsHydroPercent + this.additionalValuesSum;
  }
}