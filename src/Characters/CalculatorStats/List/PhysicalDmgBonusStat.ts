import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class PhysicalDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { physicalDmgBonus } = this.character.baseStats;
    const artifactsPhysicalPercent = this.getArtifactsValue(
      StatType.PhysicalDmgBonus
    );

    return (
      physicalDmgBonus.value +
      artifactsPhysicalPercent +
      this.getAdditionalValuesSum(skillFilter)
    );
  }
}
