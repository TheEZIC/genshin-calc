import Weapon from "./Weapon";
import Character from "../Characters/Character";

export default class WeaponManager {
  constructor(
    public character: Character,
  ) {
  }

  private _weapon: Weapon | null = null;

  public setWeapon(weapon: Weapon): this {
    this._weapon = weapon;
    this._weapon.applyPassives();
    return this;
  }

  public removeWeapon(): this {
    if (!this._weapon) return this;
    this._weapon.removePassives();
    this._weapon = null;
    return this;
  }

  public get weapon(): Weapon | null {
    return this._weapon;
  }
}