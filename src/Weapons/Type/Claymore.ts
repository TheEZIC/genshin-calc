import Weapon from "../Weapon";
import {WeaponType} from "../WeaponType";

export default abstract class Claymore extends Weapon {
  public type: WeaponType = WeaponType.Claymore;
}