import BaseStat from "@/BaseStats/BaseStat";
import { StatType } from "@/BaseStats/StatType";
import Character from "@/Entities/Characters/Character";
import Polearm from "@/Weapons/WeaponTypes/Polearm";
import { WeaponBaseMainStat } from "@/Weapons/WeaponBaseMainStat";

export default class BlackcliffPole extends Polearm {
  baseATK: BaseStat = new BaseStat([
    [42, 109],
    [135, 205],
    [231, 266],
    [292, 327],
    [353, 388],
    [414, 449],
    [475, 510]
  ]);

  mainStat: WeaponBaseMainStat = new WeaponBaseMainStat(
    StatType.CritDamage,
    [
      [12.0, 21.2],
      [21.2, 30.9],
      [30.9, 35.7],
      [35.7, 40.6],
      [40.6, 45.4],
      [45.4, 50.3],
      [50.3, 55.1]
    ]
  );

  override applyPermanentPassives(character: Character): this {
    return super.applyPermanentPassives(character);
  }

  override removePermanentPassives(character: Character): this {
    return super.removePermanentPassives(character);
  }

  override applyPassives(character: Character): this {
    return super.applyPassives(character);
  }

  override removePassives(character: Character): this {
    return super.removePassives(character);
  }
}
