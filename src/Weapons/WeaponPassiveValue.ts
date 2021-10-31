import Weapon from "./Weapon";

export class WeaponPassiveValue {
  constructor(
    private weapon: Weapon,
    private startValue: number,
    private gain: number,
  ) {
  }

  public get valueAtRefinement(): number {
    return this.startValue + this.gain * (this.weapon.refinement - 1);
  }
}