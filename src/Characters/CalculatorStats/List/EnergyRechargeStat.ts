import PureStat from "../Types/PureStat";
import {StatType} from "../../../BaseStats/StatType";

export default class EnergyRechargeStat extends PureStat {
  calc(): number {
    const {energyRecharge} = this.baseStats;
    const artifactsEnergyRecharge = this.artifacts.getStatSumByType(StatType.EnergyRecharge);

    return energyRecharge.value + artifactsEnergyRecharge + this.additionalValuesSum;
  }
}