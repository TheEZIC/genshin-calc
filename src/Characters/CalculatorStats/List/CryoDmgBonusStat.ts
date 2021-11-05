import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class CryoDmgBonusStat extends PureStat {
  calc(): number {
    const { cryoDmgBonus } = this.character.baseStats;
    const artifactsCryoPercent = this.getArtifactsValue(StatType.CryoDmgBonus);

    return cryoDmgBonus.value + artifactsCryoPercent + this.additionalValuesSum;
  }
}
