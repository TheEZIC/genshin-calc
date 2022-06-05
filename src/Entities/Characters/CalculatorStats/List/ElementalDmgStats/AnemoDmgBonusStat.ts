import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class AnemoDmgBonusStat extends PureStat {
  public title: string = "AnemoDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { anemoDmgBonus } = this.character.baseStats;
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
    const { anemoDmgBonus } = this.character.baseStats;
    const artifactsAnemoPercent = this.getArtifactsValue(
      StatType.AnemoDmgBonus
    );

    return (
      anemoDmgBonus.value +
      artifactsAnemoPercent
    );
  }
}
