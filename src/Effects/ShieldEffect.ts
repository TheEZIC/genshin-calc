import OverridableEffect from "@/Effects/OverridableEffect";
import Entity from "@/Entities/Entity";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class ShieldEffect<T extends IWithOngoingEffects> extends OverridableEffect<T> {
  private _durability: number = 0;
  private _currentDurability: number = this._durability;

  public changeDefaultDurability(durability: number): void {
    this._durability = durability;
    this.changeDurability(durability);
  }

  public changeDurability(durability: number): void {
    this._currentDurability = durability;
  }
}
