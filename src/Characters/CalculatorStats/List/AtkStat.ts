import { StatType } from "@/BaseStats/StatType";
import MainStat from "@/Characters/CalculatorStats/Types/MainStat";
import { SkillType } from "@/Skills/SkillType";

export default class AtkStat extends MainStat {
  calc(skillFilter?: SkillType): number {
    const { baseATK, percentATK } = this.character.baseStats;
    const artifactsFlatATK = this.getArtifactsValue(StatType.FlatATK);
    const artifactsPercentATK = this.getArtifactsValue(StatType.PercentATK);
    const weaponPercentATK = this.getWeaponValue(StatType.PercentATK);
    const critEffect = this.character.calculatorStats.critChance.critEffect;

    return (
      (baseATK.value +
        (this.character.weaponManager.weapon?.baseATK.value ?? 0)) *
      (1 +
        (percentATK.value +
          artifactsPercentATK +
          weaponPercentATK +
          this.getPrefixesSum(skillFilter)) /
          100 +
        artifactsFlatATK +
        this.getAdditionalValuesSum(skillFilter)) *
      (1 + this.getAffixesSum(skillFilter) / 100) *
      critEffect
    );
  }
}
