import Weapon from "@/Weapons/Weapon";
import { WeaponType } from "@/Weapons/WeaponType";

export default abstract class Polearm extends Weapon {
  public type: WeaponType = WeaponType.Polearm;
}
