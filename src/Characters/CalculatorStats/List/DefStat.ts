import { StatType } from "@/BaseStats/StatType";
import MainStat from "@/Characters/CalculatorStats/Types/MainStat";
import { SkillType } from "@/Skills/SkillType";

export default class DefStat extends MainStat {
  calc(skillFilter?: SkillType): number {
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
          this.getPrefixesSum(skillFilter)) /
          100 +
        artifactsFlatDEF +
        this.getAdditionalValuesSum(skillFilter)) *
      (1 + this.getAffixesSum(skillFilter) / 100)
    );
  }
}
