import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class CryoDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { cryoDmgBonus } = this.character.baseStats;
    const artifactsCryoPercent = this.getArtifactsValue(StatType.CryoDmgBonus);

    return cryoDmgBonus.value + artifactsCryoPercent + this.getAdditionalValuesSum(skillFilter);
  }
}
