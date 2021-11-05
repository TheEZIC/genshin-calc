import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class PyroDmgBonusStat extends PureStat {
  calc(): number {
    const { pyroDmgBonus } = this.character.baseStats;
    const artifactsPyroPercent = this.getArtifactsValue(StatType.PyroDmgBonus);

    return pyroDmgBonus.value + artifactsPyroPercent + this.additionalValuesSum;
  }
}
