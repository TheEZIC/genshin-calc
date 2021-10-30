import Weapon from "../Weapon";
import {WeaponType} from "../WeaponType";

export default abstract class Polearm extends Weapon {
  public type: WeaponType = WeaponType.Polearm;
}