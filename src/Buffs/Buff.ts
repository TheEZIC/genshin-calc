import Character from "@/Characters/Character";

export default abstract class Buff {
  public name = this.constructor.name;

  public abstract framesDuration: number;
  public abstract apply(character: Character): void;
  public abstract remove(character: Character): void;
}