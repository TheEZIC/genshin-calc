import { StatType } from "@/BaseStats/StatType";
import MainStat from "@/Entities/Characters/CalculatorStats/Types/MainStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class DefStat extends MainStat {
  public title: string = "Def";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { baseDEF, percentDEF } = this.character.baseStats;
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

  calcPure(): number {
    const { baseDEF, percentDEF } = this.character.baseStats;
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
