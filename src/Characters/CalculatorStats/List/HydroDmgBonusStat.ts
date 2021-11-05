import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class HydroDmgBonusStat extends PureStat {
  calc(): number {
    const { hydroDmgBonus } = this.character.baseStats;
    const artifactsHydroPercent = this.getArtifactsValue(StatType.HydroDmgBonus);

    return hydroDmgBonus.value + artifactsHydroPercent + this.additionalValuesSum;
  }
}
