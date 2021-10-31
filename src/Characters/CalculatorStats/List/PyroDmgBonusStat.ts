import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class PyroDmgBonusStat extends PureStat {
  calc(): number {
    const {pyroDmgBonus} = this.character.baseStats;
    const artifactsPyroPercent = this.getArtifactsValue(StatType.PyroDmgBonus);

    return pyroDmgBonus.value + artifactsPyroPercent + this.additionalValuesSum;
  }
}