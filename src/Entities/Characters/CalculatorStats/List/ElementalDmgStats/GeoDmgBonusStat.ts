import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class GeoDmgBonusStat extends CharacterPureStat {
  public title: string = "GeoDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { geoDmgBonus } = this.entity.baseStats;
    const artifactsGeoPercent = this.getArtifactsValue(StatType.GeoDmgBonus);

    return (
      geoDmgBonus.value +
      artifactsGeoPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { geoDmgBonus } = this.entity.baseStats;
    const artifactsGeoPercent = this.getArtifactsValue(StatType.GeoDmgBonus);

    return (
      geoDmgBonus.value +
      artifactsGeoPercent
    );
  }
}
