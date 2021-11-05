import { StatType } from "@/BaseStats/StatType";
import MainStat from "@/Characters/CalculatorStats/Types/MainStat";

export default class AtkStat extends MainStat {
  calc(): number {
    const { baseATK, percentATK } = this.character.baseStats;
    const artifactsFlatATK = this.getArtifactsValue(StatType.FlatATK);
    const artifactsPercentATK = this.getArtifactsValue(StatType.PercentATK);
    const weaponPercentATK = this.getWeaponValue(StatType.PercentATK);
    const critEffect = this.character.calculatorStats.critChance.critEffect;

    return (
      (baseATK.value + (this.character.weaponManager.weapon?.baseATK.value ?? 0)) *
      (1 +
        (percentATK.value + artifactsPercentATK + weaponPercentATK + this.prefixesSum) / 100 +
        artifactsFlatATK +
        this.additionalValuesSum) *
      (1 + this.affixesSum / 100) *
      critEffect
    );
  }
}
