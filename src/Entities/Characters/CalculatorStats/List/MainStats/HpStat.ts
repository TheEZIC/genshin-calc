import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterMainStat from "@/Entities/Characters/CalculatorStats/Types/CharacterMainStat";

export default class HpStat extends CharacterMainStat {
  public title: string = "Hp";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { baseHP, percentHP } = this.entity.baseStats;
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

  override calcDisplayed(): number {
    const { baseHP, percentHP } = this.entity.baseStats;
    const artifactsFlatHP = this.getArtifactsValue(StatType.FlatHP);
    const artifactsPercentHP = this.getArtifactsValue(StatType.PercentHP);

    return (
      baseHP.value *
      (1 +
        (percentHP.value +
          artifactsPercentHP +
          this.prefixes.getSum()) /
        100 +
        artifactsFlatHP +
        this.additionalValues.getSum()) *
      (1 + this.prefixes.getSum() / 100)
    );
  }

  calcPure(): number {
    const { baseHP, percentHP } = this.entity.baseStats;
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
