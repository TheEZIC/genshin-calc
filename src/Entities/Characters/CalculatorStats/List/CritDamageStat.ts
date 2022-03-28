import { StatType } from "@/BaseStats/StatType";
import CritStat from "@/Entities/Characters/CalculatorStats/Types/CritStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class CritDamageStat extends CritStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { critDamage } = this.character.baseStats;
    const artifactsCritDamage = this.getArtifactsValue(StatType.CritDamage);
    const weaponCritDamage = this.getWeaponValue(StatType.CritDamage);

    return (
      critDamage.value +
      artifactsCritDamage +
      weaponCritDamage +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { critDamage } = this.character.baseStats;
    const artifactsCritDamage = this.getArtifactsValue(StatType.CritDamage);
    const weaponCritDamage = this.getWeaponValue(StatType.CritDamage);

    return (
      critDamage.value +
      artifactsCritDamage +
      weaponCritDamage
    );
  }
}
