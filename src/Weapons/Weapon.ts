import {WeaponType} from "./WeaponType";
import BaseStat from "../BaseStats/BaseStat";
import {WeaponBaseMainStat} from "./WeaponBaseMainStat";

export default abstract class Weapon {
  public abstract type: WeaponType;
  public abstract baseATK: BaseStat;
  public abstract mainStat: WeaponBaseMainStat;

  public abstract applyPassives(): this;
  public abstract removePassives(): this;

  public readonly MAX_REFINEMENT_COUNT = 5;
  public refinement: number = 1;

  get currentRefinement() {
    return this.refinement;
  }

  set currentAscend(refinement: number) {
    if (refinement > this.MAX_REFINEMENT_COUNT) return;
    this.refinement = refinement;
  }

  public applyLvl(lvl: number): this {
    this.baseATK.applyLvl(lvl);
    return this;
  }
}