import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class DendroDmgBonusStat extends CharacterPureStat {
  public title: string = "DendroDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { dendroDmgBonus } = this.entity.baseStats;
    const artifactsDendroPercent = this.getArtifactsValue(
      StatType.DendroDmgBonus
    );

    return (
      dendroDmgBonus.value +
      artifactsDendroPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { dendroDmgBonus } = this.entity.baseStats;
    const artifactsDendroPercent = this.getArtifactsValue(
      StatType.DendroDmgBonus
    );

    return (
      dendroDmgBonus.value +
      artifactsDendroPercent
    );
  }
}
