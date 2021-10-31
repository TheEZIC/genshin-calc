import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class CryoDmgBonusStat extends PureStat {
  calc(): number {
    const {cryoDmgBonus} = this.character.baseStats;
    const artifactsCryoPercent = this.getArtifactsValue(StatType.CryoDmgBonus);

    return cryoDmgBonus.value + artifactsCryoPercent + this.additionalValuesSum;
  }
}