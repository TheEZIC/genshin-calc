import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class GeoDmgBonusStat extends PureStat {
  calc(): number {
    const { geoDmgBonus } = this.character.baseStats;
    const artifactsGeoPercent = this.getArtifactsValue(StatType.GeoDmgBonus);

    return geoDmgBonus.value + artifactsGeoPercent + this.additionalValuesSum;
  }
}
