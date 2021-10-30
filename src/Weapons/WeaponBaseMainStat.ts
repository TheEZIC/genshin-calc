import BaseStat from "../BaseStats/BaseStat";
import {StatType} from "../BaseStats/StatType";
import AscensionsIterator from "../BaseStats/AscensionsIterator";

export class WeaponBaseMainStat extends BaseStat {
  constructor(
    public type: StatType,
    ascensions: AscensionsIterator,
  ) {
    super(ascensions);
  }

  public isType(type: StatType): boolean {
    return this.type === type;
  }
}