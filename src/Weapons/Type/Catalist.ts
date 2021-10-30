import Weapon from "../Weapon";
import {WeaponType} from "../WeaponType";

export default abstract class Catalist extends Weapon {
  public type: WeaponType = WeaponType.Catalist;
}