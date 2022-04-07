import BaseStat from "@/BaseStats/BaseStat";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";

export default class AyakaBaseStats extends CharacterBaseStats {
  readonly baseATK: BaseStat = new BaseStat([
    [27, 79],
    [92, 138],
    [154, 177],
    [198, 222],
    [238, 262],
    [278, 302],
    [318, 342]
  ]);

  readonly baseDEF: BaseStat = new BaseStat([

  ]);

  readonly baseHP: BaseStat = new BaseStat( [
    [1.001, 2.597],
    [3.455, 5.170],
    [5.779, 6.649],
    [7.462, 8.341],
    [8.951, 9.838],
    [10.448, 11.345],
    [11.954, 12.858]
  ]);
}
