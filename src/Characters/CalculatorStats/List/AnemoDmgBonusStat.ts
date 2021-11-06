import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class AnemoDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { anemoDmgBonus } = this.character.baseStats;
    const artifactsAnemoPercent = this.getArtifactsValue(StatType.AnemoDmgBonus);

    return anemoDmgBonus.value + artifactsAnemoPercent + this.getAdditionalValuesSum(skillFilter);
  }
}
