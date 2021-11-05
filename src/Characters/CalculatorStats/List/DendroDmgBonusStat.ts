import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class DendroDmgBonusStat extends PureStat {
  calc(): number {
    const { dendroDmgBonus } = this.character.baseStats;
    const artifactsDendroPercent = this.getArtifactsValue(StatType.DendroDmgBonus);

    return dendroDmgBonus.value + artifactsDendroPercent + this.additionalValuesSum;
  }
}
