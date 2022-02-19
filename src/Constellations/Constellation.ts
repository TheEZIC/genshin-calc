import Character from "@/Entities/Characters/Character";

export default abstract class Constellation {
  private isActive = false;

  public abstract applyEffect(character: Character): void;
  public abstract removeEffect(character: Character): void;

  public activate(character: Character): void {
    if (!this.isActive) {
      this.applyEffect(character);
    }

    this.isActive = true;
  }

  public deactivate(character: Character): void {
    if (this.isActive) {
      this.removeEffect(character);
    }

    this.isActive = false;
  }
}
