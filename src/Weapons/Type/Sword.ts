import Weapon from "../Weapon";
import {WeaponType} from "../WeaponType";

export default abstract class Sword extends Weapon {
  public type: WeaponType = WeaponType.Sword;
}