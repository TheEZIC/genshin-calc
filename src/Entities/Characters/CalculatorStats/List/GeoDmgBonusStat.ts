import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class GeoDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { geoDmgBonus } = this.character.baseStats;
    const artifactsGeoPercent = this.getArtifactsValue(StatType.GeoDmgBonus);

    return (
      geoDmgBonus.value +
      artifactsGeoPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { geoDmgBonus } = this.character.baseStats;
    const artifactsGeoPercent = this.getArtifactsValue(StatType.GeoDmgBonus);

    return (
      geoDmgBonus.value +
      artifactsGeoPercent
    );
  }
}
