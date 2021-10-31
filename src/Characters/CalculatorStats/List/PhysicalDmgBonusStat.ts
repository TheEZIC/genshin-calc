import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class PhysicalDmgBonusStat extends PureStat {
  calc(): number {
    const {physicalDmgBonus} = this.character.baseStats;
    const artifactsPhysicalPercent = this.getArtifactsValue(StatType.PhysicalDmgBonus);

    return physicalDmgBonus.value + artifactsPhysicalPercent + this.additionalValuesSum;
  }
}