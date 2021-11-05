import AscensionsIterator from "@/BaseStats/AscensionsIterator";
import BaseStat from "@/BaseStats/BaseStat";
import { StatType } from "@/BaseStats/StatType";

export class WeaponBaseMainStat extends BaseStat {
  constructor(public type: StatType, ascensions: AscensionsIterator) {
    super(ascensions);
  }

  /**
   * Check weapon type
   * @param {StatType} type - type
   * */
  public isType(type: StatType): boolean {
    return this.type === type;
  }

  /**
   * Apply lvl to weapon
   * @param {number} lvl - apply lvl to weapon main stat
   * */
  public override applyLvl(lvl: number) {
    if (lvl < 1) return;

    for (let i = 1; i <= this.maxLvl; i++) {
      const index = this.getCurrentAscensionIndex(i);
      const ascension = this.ascensions.at(index);

      if (!ascension) continue;
      if (i % 5 === 0) this.currentValue += ascension.gain * 5;
      if (i === lvl) break;
    }
  }
}
