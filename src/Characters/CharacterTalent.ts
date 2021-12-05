import Character from "@/Characters/Character";

export default abstract class CharacterTalent {
  constructor(public character: Character) {}

  public abstract activate(): void;
  public abstract deactivate(): void;
}
