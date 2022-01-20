import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class DendroDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { dendroDmgBonus } = this.character.baseStats;
    const artifactsDendroPercent = this.getArtifactsValue(
      StatType.DendroDmgBonus
    );

    return (
      dendroDmgBonus.value +
      artifactsDendroPercent +
      this.additionalValues.getSum(skillFilter)
    );
  }
}
