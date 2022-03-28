import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class HydroDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { hydroDmgBonus } = this.character.baseStats;
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
    const { hydroDmgBonus } = this.character.baseStats;
    const artifactsHydroPercent = this.getArtifactsValue(
      StatType.HydroDmgBonus
    );

    return (
      hydroDmgBonus.value +
      artifactsHydroPercent
    );
  }
}
