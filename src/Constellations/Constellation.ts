import Character from "@/Entities/Characters/Character";

export default abstract class Constellation {
  private _isActive = false;

  public abstract applyEffect(character: Character): void;
  public abstract removeEffect(character: Character): void;

  public get isActive() {
    return this._isActive;
  }

  public activate(character: Character): void {
    if (!this._isActive) {
      this.applyEffect(character);
    }

    this._isActive = true;
  }

  public deactivate(character: Character): void {
    if (this._isActive) {
      this.removeEffect(character);
    }

    this._isActive = false;
  }
}
