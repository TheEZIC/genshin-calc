import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterMainStat from "@/Entities/Characters/CalculatorStats/Types/CharacterMainStat";

export default class DefStat extends CharacterMainStat {
  public title: string = "Def";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { baseDEF, percentDEF } = this.entity.baseStats;
    const artifactsFlatDEF = this.getArtifactsValue(StatType.FlatDEF);
    const artifactsPercentDEF = this.getArtifactsValue(StatType.PercentDEF);
    const weaponPercentDef = this.getWeaponValue(StatType.PercentDEF);

    return (
      baseDEF.value *
      (1 +
        (percentDEF.value +
          artifactsPercentDEF +
          weaponPercentDef +
          this.prefixes.getSum(skillFilter, tenses)) /
          100 +
        artifactsFlatDEF +
        this.affixes.getSum(skillFilter, tenses)) *
      (1 + this.affixes.getSum(skillFilter, tenses) / 100)
    );
  }

  override calcDisplayed(): number {
    const { baseDEF, percentDEF } = this.entity.baseStats;
    const artifactsFlatDEF = this.getArtifactsValue(StatType.FlatDEF);
    const artifactsPercentDEF = this.getArtifactsValue(StatType.PercentDEF);
    const weaponPercentDef = this.getWeaponValue(StatType.PercentDEF);

    return (
      baseDEF.value *
      (1 +
        (percentDEF.value +
          artifactsPercentDEF +
          weaponPercentDef +
          this.prefixes.getSum()) /
        100 +
        artifactsFlatDEF +
        this.affixes.getSum())
    );
  }

  calcPure(): number {
    const { baseDEF, percentDEF } = this.entity.baseStats;
    const artifactsFlatDEF = this.getArtifactsValue(StatType.FlatDEF);
    const artifactsPercentDEF = this.getArtifactsValue(StatType.PercentDEF);
    const weaponPercentDef = this.getWeaponValue(StatType.PercentDEF);

    return (
      baseDEF.value *
      (1 +
        (percentDEF.value +
          artifactsPercentDEF +
          weaponPercentDef) /
        100 +
        artifactsFlatDEF)
    );
  }
}
