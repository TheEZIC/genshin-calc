import { StatType } from "@/BaseStats/StatType";
import CritStat from "@/Characters/CalculatorStats/Types/CritStat";

export default class CritDamageStat extends CritStat {
  calc(): number {
    const { critDamage } = this.character.baseStats;
    const artifactsCritDamage = this.getArtifactsValue(StatType.CritDamage);
    const weaponCritDamage = this.getWeaponValue(StatType.CritDamage);

    return critDamage.value + artifactsCritDamage + this.additionalValuesSum;
  }
}
