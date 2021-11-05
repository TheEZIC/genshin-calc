import { StatType } from "@/BaseStats/StatType";
import CritStat from "@/Characters/CalculatorStats/Types/CritStat";

export default class CritChanceStat extends CritStat {
  calc(): number {
    const { critChance } = this.character.baseStats;
    const artifactsCritChance = this.getArtifactsValue(StatType.CritChance);
    const weaponCritChange = this.getWeaponValue(StatType.CritChance);

    return critChance.value + artifactsCritChance + weaponCritChange + this.additionalValuesSum;
  }
}
