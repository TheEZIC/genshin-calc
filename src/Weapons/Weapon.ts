import {WeaponType} from "./WeaponType";
import BaseStat from "../BaseStats/BaseStat";
import {WeaponBaseMainStat} from "./WeaponBaseMainStat";
import Character from "../Characters/Character";

export default abstract class Weapon {
  public abstract type: WeaponType;
  public abstract baseATK: BaseStat;
  public abstract mainStat: WeaponBaseMainStat;

  public isPassivesActivated = false;

  public applyPassives(character: Character): this {
    this.isPassivesActivated = true;
    return this;
  }

  public removePassives(character: Character): this {
    this.isPassivesActivated = false;
    return this;
  }

  public isPermanentPassivesActivated = false;

  public applyPermanentPassives(character: Character): this {
    this.isPermanentPassivesActivated = true;
    return this;
  }

  public removePermanentPassives(character: Character): this {
    this.isPermanentPassivesActivated = false;
    return this;
  }

  public readonly MAX_REFINEMENT_COUNT = 5;
  private _refinement: number = 1;

  get refinement(): number {
    return this._refinement;
  }

  set refinement(refinement: number) {
    this._refinement = refinement;
  }

  public applyLvl(lvl: number): this {
    this.baseATK.applyLvl(lvl);
    this.mainStat.applyLvl(lvl);
    return this;
  }
}