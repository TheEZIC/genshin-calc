import Character from "@/Characters/Character";

import Weapon from "./Weapon";
import BuffManager from "@/Buffs/BuffManager";

export default class WeaponManager {
  constructor(public character: Character) {}

  private _weapon: Weapon | null = null;
  private buffs: BuffManager = new BuffManager(this.character);

  public get weapon(): Weapon | null {
    return this._weapon;
  }

  public setWeapon(weapon: Weapon): this {
    this._weapon = weapon;
    this._weapon.applyPermanentPassives(this.character);
    this._weapon.applyPassives(this.character);
    return this;
  }

  public removeWeapon(): this {
    if (!this._weapon) return this;
    this._weapon.applyPermanentPassives(this.character);
    this._weapon.removePassives(this.character);
    this._weapon = null;
    return this;
  }

  public changeRefinement(refinement: number): this {
    if (
      !this.weapon ||
      this.weapon.refinement > this.weapon.MAX_REFINEMENT_COUNT
    )
      return this;

    const oldRefinement = this.weapon.refinement;

    if (this.weapon.isPassivesActivated) {
      this.weapon.removePassives(this.character);
      this.weapon.refinement = refinement;
      this.weapon.applyPassives(this.character);
      this.weapon.refinement = oldRefinement;
    }

    if (this.weapon.isPermanentPassivesActivated) {
      this.weapon.removePermanentPassives(this.character);
      this.weapon.refinement = refinement;
      this.weapon.applyPermanentPassives(this.character);
      this.weapon.refinement = oldRefinement;
    }

    this.weapon.refinement = refinement;

    return this;
  }
}
