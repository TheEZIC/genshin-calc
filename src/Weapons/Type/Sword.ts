import Weapon from "@/Weapons/Weapon";
import { WeaponType } from "@/Weapons/WeaponType";

export default abstract class Sword extends Weapon {
  public type: WeaponType = WeaponType.Sword;
}
