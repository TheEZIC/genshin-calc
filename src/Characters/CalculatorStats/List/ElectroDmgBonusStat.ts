import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class ElectroDmgBonusStat extends PureStat {
  calc(): number {
    const { electroDmgBonus } = this.character.baseStats;
    const artifactsElectroPercent = this.getArtifactsValue(StatType.ElectroDmgBonus);

    return electroDmgBonus.value + artifactsElectroPercent + this.additionalValuesSum;
  }
}
