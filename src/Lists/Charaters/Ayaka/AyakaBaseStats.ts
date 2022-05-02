import BaseStat from "@/BaseStats/BaseStat";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";
import CharacterAscendableBaseStat from "@/Entities/Characters/CharacterAscendableBaseStat";

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
    [61, 158],
    [211, 315],
    [352, 405],
    [455, 509],
    [546, 600],
    [637, 692],
    [729, 784]
  ]);

  readonly baseHP: BaseStat = new BaseStat( [
    [1001, 2597],
    [3455, 5170],
    [5779, 6649],
    [7462, 8341],
    [8951, 9838],
    [10448, 11345],
    [11954, 12858]
  ]);

  public override readonly critDamage =
    new CharacterAscendableBaseStat(50, 9.6);
}
