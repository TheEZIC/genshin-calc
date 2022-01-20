import Weapon from "@/Weapons/Weapon";
import { WeaponType } from "@/Weapons/WeaponType";

export default abstract class Catalist extends Weapon {
  public type: WeaponType = WeaponType.Catalist;
}
