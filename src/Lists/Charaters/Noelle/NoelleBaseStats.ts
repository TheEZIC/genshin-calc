import BaseStat from "@/BaseStats/BaseStat";
import CharacterAscendableBaseStat from "@/Entities/Characters/CharacterAscendableBaseStat";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";

export default class NoelleBaseStats extends CharacterBaseStats {
  public readonly baseATK: BaseStat = new BaseStat([
    [16, 41],
    [53, 80],
    [88, 101],
    [113, 126],
    [134, 148],
    [156, 169],
    [178, 191]
  ]);

  public readonly baseDEF: BaseStat = new BaseStat([
    [67, 172],
    [222, 333],
    [368, 423],
    [471, 526],
    [562, 617],
    [652, 708],
    [743, 799]
  ]);

  public readonly baseHP: BaseStat = new BaseStat([
    [1012, 2600],
    [3356, 5027],
    [5564, 6400],
    [7117, 7953],
    [8490, 9325],
    [9862, 10698],
    [11235, 12071]
  ]);

  public override readonly percentDEF: CharacterAscendableBaseStat =
    new CharacterAscendableBaseStat(0, 7.5);
}
