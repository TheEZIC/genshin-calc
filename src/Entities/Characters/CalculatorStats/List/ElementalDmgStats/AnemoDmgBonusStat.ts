import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class AnemoDmgBonusStat extends CharacterPureStat {
  public title: string = "AnemoDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { anemoDmgBonus } = this.entity.baseStats;
    const artifactsAnemoPercent = this.getArtifactsValue(
      StatType.AnemoDmgBonus
    );

    return (
      anemoDmgBonus.value +
      artifactsAnemoPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { anemoDmgBonus } = this.entity.baseStats;
    const artifactsAnemoPercent = this.getArtifactsValue(
      StatType.AnemoDmgBonus
    );

    return (
      anemoDmgBonus.value +
      artifactsAnemoPercent
    );
  }
}
