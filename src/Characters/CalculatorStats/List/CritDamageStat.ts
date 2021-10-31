import CritStat from "../Types/CritStat";
import {StatType} from "../../../BaseStats/StatType";

export default class CritDamageStat extends CritStat {
  calc(): number {
    const {critDamage} = this.character.baseStats;
    const artifactsCritDamage = this.getArtifactsValue(StatType.CritDamage);
    const weaponCritDamage = this.getWeaponValue(StatType.CritDamage);

    return critDamage.value + artifactsCritDamage + this.additionalValuesSum;
  }
}