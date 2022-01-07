import Character from "@/Characters/Character";
import Timeline from "@/Roster/Timeline";

export default class Roster {
  public static readonly MAX_CHARACTERS_COUNT = 4;
  private _characters: Character[] = [];
  private _index: number = 0;

  public timeline: Timeline = new Timeline(this);

  get characters() {
    return this._characters;
  }

  get currentCharacter() {
    return this._characters[this._index];
  }

  public addCharacter(character: Character) {
    if (this._characters.length > Roster.MAX_CHARACTERS_COUNT) return;
    this._characters.push(character);
  }

  public removeCharacter(character: Character) {
    this._characters = this._characters.filter((c) => c.name !== character.name);
  }
}
