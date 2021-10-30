import Claymore from "../../Type/Claymore";
import BaseStat from "../../../BaseStats/BaseStat";
import AscensionsIterator from "../../../BaseStats/AscensionsIterator";
import {WeaponBaseMainStat} from "../../WeaponBaseMainStat";
import {StatType} from "../../../BaseStats/StatType";
import {WeaponType} from "../../WeaponType";

export default class WolfGravestoneWeapon extends Claymore {
  baseATK: BaseStat = new BaseStat(new AscensionsIterator([
    [46, 122],
  ]));
  mainStat: WeaponBaseMainStat = new WeaponBaseMainStat(StatType.PercentATK, new AscensionsIterator([
    [10.8, 19.1],
  ]));

  applyPassives(): this {
    return this;
  }

  removePassives(): this {
    return this;
  }
}