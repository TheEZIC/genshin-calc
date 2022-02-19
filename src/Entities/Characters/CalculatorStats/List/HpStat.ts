import { StatType } from "@/BaseStats/StatType";
import MainStat from "@/Entities/Characters/CalculatorStats/Types/MainStat";
import { SkillType } from "@/Skills/SkillType";

export default class HpStat extends MainStat {
  calc(skillFilter?: SkillType): number {
    const { baseHP, percentHP } = this.character.baseStats;
    const artifactsFlatHP = this.getArtifactsValue(StatType.FlatHP);
    const artifactsPercentHP = this.getArtifactsValue(StatType.PercentHP);

    return (
      baseHP.value *
      (1 +
        (percentHP.value +
          artifactsPercentHP +
          this.prefixes.getSum(skillFilter)) /
          100 +
        artifactsFlatHP +
        this.additionalValues.getSum(skillFilter)) *
      (1 + this.prefixes.getSum(skillFilter) / 100)
    );
  }
}
