import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class DendroDmgBonusStat extends PureStat {
  public title: string = "DendroDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { dendroDmgBonus } = this.character.baseStats;
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
    const { dendroDmgBonus } = this.character.baseStats;
    const artifactsDendroPercent = this.getArtifactsValue(
      StatType.DendroDmgBonus
    );

    return (
      dendroDmgBonus.value +
      artifactsDendroPercent
    );
  }
}
