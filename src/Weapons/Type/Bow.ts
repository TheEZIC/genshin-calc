import Weapon from "../Weapon";
import {WeaponType} from "../WeaponType";

export default abstract class Bow extends Weapon {
  public type: WeaponType = WeaponType.Bow;
}