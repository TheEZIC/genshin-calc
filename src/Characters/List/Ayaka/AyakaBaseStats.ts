import CharacterBaseStats from "../../CharacterBaseStats";
import AscensionsIterator from "../../../BaseStats/AscensionsIterator";
import BaseStat from "../../../BaseStats/BaseStat";

export default class AyakaBaseStats extends CharacterBaseStats {
  readonly baseATK: BaseStat = new BaseStat(new AscensionsIterator([
    [27, 70],
    [92, 138],
    [154, 177],
    [198, 222],
    [238, 262],
    [278, 302],
    [278, 302],
    [318, 342],
  ]));
  readonly baseDEF: BaseStat = new BaseStat(new AscensionsIterator([

  ]));
  readonly baseHP: BaseStat = new BaseStat(new AscensionsIterator([

  ]));
}