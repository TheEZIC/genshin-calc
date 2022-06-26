import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class PyroDmgBonusStat extends CharacterPureStat {
  public title: string = "PyroDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { pyroDmgBonus } = this.entity.baseStats;
    const artifactsPyroPercent = this.getArtifactsValue(StatType.PyroDmgBonus);

    return (
      pyroDmgBonus.value +
      artifactsPyroPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { pyroDmgBonus } = this.entity.baseStats;
    const artifactsPyroPercent = this.getArtifactsValue(StatType.PyroDmgBonus);

    return (
      pyroDmgBonus.value +
      artifactsPyroPercent
    );
  }
}
