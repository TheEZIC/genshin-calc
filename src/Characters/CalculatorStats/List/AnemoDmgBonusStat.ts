import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class AnemoDmgBonusStat extends PureStat {
  calc(): number {
    const {anemoDmgBonus} = this.character.baseStats;
    const artifactsAnemoPercent = this.getArtifactsValue(StatType.AnemoDmgBonus);

    return anemoDmgBonus.value + artifactsAnemoPercent + this.additionalValuesSum;
  }
}