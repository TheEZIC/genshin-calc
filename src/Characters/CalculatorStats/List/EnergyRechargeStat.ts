import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class EnergyRechargeStat extends PureStat {
  calc(): number {
    const { energyRecharge } = this.character.baseStats;
    const artifactsEnergyRecharge = this.getArtifactsValue(StatType.EnergyRecharge);

    return energyRecharge.value + artifactsEnergyRecharge + this.additionalValuesSum;
  }
}
