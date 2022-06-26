import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class HydroDmgBonusStat extends CharacterPureStat {
  public title: string = "HydroDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { hydroDmgBonus } = this.entity.baseStats;
    const artifactsHydroPercent = this.getArtifactsValue(
      StatType.HydroDmgBonus
    );

    return (
      hydroDmgBonus.value +
      artifactsHydroPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { hydroDmgBonus } = this.entity.baseStats;
    const artifactsHydroPercent = this.getArtifactsValue(
      StatType.HydroDmgBonus
    );

    return (
      hydroDmgBonus.value +
      artifactsHydroPercent
    );
  }
}
