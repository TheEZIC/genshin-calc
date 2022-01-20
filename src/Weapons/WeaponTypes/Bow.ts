import Weapon from "@/Weapons/Weapon";
import { WeaponType } from "@/Weapons/WeaponType";

export default abstract class Bow extends Weapon {
  public type: WeaponType = WeaponType.Bow;
}
