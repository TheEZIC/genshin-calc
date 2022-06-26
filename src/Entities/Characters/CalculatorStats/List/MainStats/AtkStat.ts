import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterMainStat from "@/Entities/Characters/CalculatorStats/Types/CharacterMainStat";

export default class AtkStat extends CharacterMainStat {
  public title: string = "AtkStat";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { baseATK, percentATK } = this.entity.baseStats;
    const artifactsFlatATK = this.getArtifactsValue(StatType.FlatATK);
    const artifactsPercentATK = this.getArtifactsValue(StatType.PercentATK);
    const weaponPercentATK = this.getWeaponValue(StatType.PercentATK);

    return (
      (baseATK.value +
        (this.entity.weaponManager.weapon?.baseATK.value ?? 0)) *
      (1 +
        (percentATK.value +
          artifactsPercentATK +
          weaponPercentATK +
          this.prefixes.getSum(skillFilter, tenses)) /
          100 +
        artifactsFlatATK +
        this.additionalValues.getSum(skillFilter, tenses)) *
      (1 + this.affixes.getSum(skillFilter, tenses) / 100)
    );
  }

  override calcDisplayed(): number {
    const { baseATK, percentATK } = this.entity.baseStats;
    const artifactsFlatATK = this.getArtifactsValue(StatType.FlatATK);
    const artifactsPercentATK = this.getArtifactsValue(StatType.PercentATK);
    const weaponPercentATK = this.getWeaponValue(StatType.PercentATK);

    return (
      (baseATK.value +
        (this.entity.weaponManager.weapon?.baseATK.value ?? 0)) *
      (1 +
        (percentATK.value +
          artifactsPercentATK +
          weaponPercentATK +
          this.prefixes.getSum()) /
        100 +
        artifactsFlatATK +
        this.additionalValues.getSum())
    );
  }

  calcPure(): number {
    const { baseATK, percentATK } = this.entity.baseStats;
    const artifactsFlatATK = this.getArtifactsValue(StatType.FlatATK);
    const artifactsPercentATK = this.getArtifactsValue(StatType.PercentATK);
    const weaponPercentATK = this.getWeaponValue(StatType.PercentATK);

    return (
      (baseATK.value +
        (this.entity.weaponManager.weapon?.baseATK.value ?? 0)) *
      (1 +
        (percentATK.value +
          artifactsPercentATK +
          weaponPercentATK) /
        100 +
        artifactsFlatATK)
    );
  }
}
