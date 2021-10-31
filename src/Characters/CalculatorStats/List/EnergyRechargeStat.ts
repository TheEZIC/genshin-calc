import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class EnergyRechargeStat extends PureStat {
  calc(): number {
    const {energyRecharge} = this.character.baseStats;
    const artifactsEnergyRecharge = this.getArtifactsValue(StatType.EnergyRecharge);

    return energyRecharge.value + artifactsEnergyRecharge + this.additionalValuesSum;
  }
}