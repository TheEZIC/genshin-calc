import { StatType } from "@/BaseStats/StatType";
import MainStat from "@/Entities/Characters/CalculatorStats/Types/MainStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class HpStat extends MainStat {
  public title: string = "Hp";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { baseHP, percentHP } = this.character.baseStats;
    const artifactsFlatHP = this.getArtifactsValue(StatType.FlatHP);
    const artifactsPercentHP = this.getArtifactsValue(StatType.PercentHP);

    return (
      baseHP.value *
      (1 +
        (percentHP.value +
          artifactsPercentHP +
          this.prefixes.getSum(skillFilter, tenses)) /
          100 +
        artifactsFlatHP +
        this.additionalValues.getSum(skillFilter, tenses)) *
      (1 + this.prefixes.getSum(skillFilter, tenses) / 100)
    );
  }

  calcPure(): number {
    const { baseHP, percentHP } = this.character.baseStats;
    const artifactsFlatHP = this.getArtifactsValue(StatType.FlatHP);
    const artifactsPercentHP = this.getArtifactsValue(StatType.PercentHP);

    return (
      baseHP.value *
      (1 +
        (percentHP.value +
          artifactsPercentHP) /
        100 +
        artifactsFlatHP)
    );
  }
}
