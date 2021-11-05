import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class AnemoDmgBonusStat extends PureStat {
  calc(): number {
    const { anemoDmgBonus } = this.character.baseStats;
    const artifactsAnemoPercent = this.getArtifactsValue(StatType.AnemoDmgBonus);

    return anemoDmgBonus.value + artifactsAnemoPercent + this.additionalValuesSum;
  }
}
