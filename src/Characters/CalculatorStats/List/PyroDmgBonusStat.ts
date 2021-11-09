import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class PyroDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { pyroDmgBonus } = this.character.baseStats;
    const artifactsPyroPercent = this.getArtifactsValue(StatType.PyroDmgBonus);

    return (
      pyroDmgBonus.value +
      artifactsPyroPercent +
      this.getAdditionalValuesSum(skillFilter)
    );
  }
}
