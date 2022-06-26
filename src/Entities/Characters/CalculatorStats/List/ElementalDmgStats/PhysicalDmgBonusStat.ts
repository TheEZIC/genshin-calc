import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class PhysicalDmgBonusStat extends CharacterPureStat {
  public title: string = "PhysicalDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { physicalDmgBonus } = this.entity.baseStats;
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
    const { physicalDmgBonus } = this.entity.baseStats;
    const artifactsPhysicalPercent = this.getArtifactsValue(
      StatType.PhysicalDmgBonus
    );

    return (
      physicalDmgBonus.value +
      artifactsPhysicalPercent
    );
  }
}
