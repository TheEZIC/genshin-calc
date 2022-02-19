import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class GeoDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { geoDmgBonus } = this.character.baseStats;
    const artifactsGeoPercent = this.getArtifactsValue(StatType.GeoDmgBonus);

    return (
      geoDmgBonus.value +
      artifactsGeoPercent +
      this.additionalValues.getSum(skillFilter)
    );
  }
}
