import Weapon from "@/Weapons/Weapon";
import { WeaponType } from "@/Weapons/WeaponType";

export default abstract class Claymore extends Weapon {
  public type: WeaponType = WeaponType.Claymore;
}
