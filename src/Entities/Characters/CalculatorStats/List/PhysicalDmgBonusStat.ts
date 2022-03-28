import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class PhysicalDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { physicalDmgBonus } = this.character.baseStats;
    const artifactsPhysicalPercent = this.getArtifactsValue(
      StatType.PhysicalDmgBonus
    );

    return (
      physicalDmgBonus.value +
      artifactsPhysicalPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { physicalDmgBonus } = this.character.baseStats;
    const artifactsPhysicalPercent = this.getArtifactsValue(
      StatType.PhysicalDmgBonus
    );

    return (
      physicalDmgBonus.value +
      artifactsPhysicalPercent
    );
  }
}
