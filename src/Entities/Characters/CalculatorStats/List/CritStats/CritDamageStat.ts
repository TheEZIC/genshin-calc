import { StatType } from "@/BaseStats/StatType";
import CritStat from "@/Entities/Characters/CalculatorStats/Types/CritStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class CritDamageStat extends CritStat {
  public title: string = "CritDamage";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { critDamage } = this.entity.baseStats;
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
    const { critDamage } = this.entity.baseStats;
    const artifactsCritDamage = this.getArtifactsValue(StatType.CritDamage);
    const weaponCritDamage = this.getWeaponValue(StatType.CritDamage);

    return (
      critDamage.value +
      artifactsCritDamage +
      weaponCritDamage
    );
  }
}
