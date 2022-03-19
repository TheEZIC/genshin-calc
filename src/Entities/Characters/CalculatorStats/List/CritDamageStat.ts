import { StatType } from "@/BaseStats/StatType";
import CritStat from "@/Entities/Characters/CalculatorStats/Types/CritStat";
import { SkillType } from "@/Skills/SkillType";

export default class CritDamageStat extends CritStat {
  calc(skillFilter?: SkillType): number {
    const { critDamage } = this.character.baseStats;
    const artifactsCritDamage = this.getArtifactsValue(StatType.CritDamage);
    const weaponCritDamage = this.getWeaponValue(StatType.CritDamage);

    return (
      critDamage.value +
      artifactsCritDamage +
      weaponCritDamage +
      this.additionalValues.getSum(skillFilter)
    );
  }
}