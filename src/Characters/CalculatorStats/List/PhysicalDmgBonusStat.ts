import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class PhysicalDmgBonusStat extends PureStat {
  calc(): number {
    const { physicalDmgBonus } = this.character.baseStats;
    const artifactsPhysicalPercent = this.getArtifactsValue(StatType.PhysicalDmgBonus);

    return physicalDmgBonus.value + artifactsPhysicalPercent + this.additionalValuesSum;
  }
}
