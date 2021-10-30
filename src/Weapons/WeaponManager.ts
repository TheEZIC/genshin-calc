import Weapon from "./Weapon";
import Character from "../Characters/Character";

export default class WeaponManager {
  constructor(
    public character: Character,
  ) {
  }

  private weapon: Weapon | null = null;

  public setWeapon(weapon: Weapon): this {
    this.weapon = weapon;
    this.weapon.applyPassives();
    return this;
  }

  public removeWeapon(): this {
    if (!this.weapon) return this;
    this.weapon.removePassives();
    this.weapon = null;
    return this;
  }

  public getWeapon() {
    return this.weapon;
  }
}