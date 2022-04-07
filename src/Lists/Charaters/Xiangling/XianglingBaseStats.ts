import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";
import BaseStat from "@/BaseStats/BaseStat";

export default class XianglingBaseStats extends CharacterBaseStats {
  readonly baseATK: BaseStat = new BaseStat([
    [19, 48],
    [63, 94],
    [104, 119],
    [133, 148],
    [158, 174],
    [184, 200],
    [210, 225],
  ]);

  readonly baseDEF: BaseStat = new BaseStat([
    [56, 144],
    [186, 279],
    [308, 355],
    [394, 441],
    [470, 517],
    [546, 593],
    [623, 669],
  ]);

  readonly baseHP: BaseStat = new BaseStat([
    [912, 2342],
    [3024, 4529],
    [5013, 2766],
    [6411, 7164],
    [7648, 8401],
    [8885, 9638],
    [10122, 10575],
  ]);
}
