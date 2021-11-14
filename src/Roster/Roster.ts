import Character from "@/Characters/Character";
import { Constructor } from "@/Helpers/Constructor";

export default class Roster {
  public static readonly MAX_CHARACTERS_COUNT = 4;
  private _characters: Character[] = [];
  private _index: number = 0;

  get characters() {
    return this._characters;
  }

  get currentCharacter() {
    return this._characters[this._index];
  }

  public findCharacterIndex<T extends Character>(Char: Constructor<T>): number {
    for(let i = 0; i < this._characters.length; i++) {
      if(this._characters[i] instanceof Char)
        return i;
    }
    return -1;
  }

  public addCharacter<T extends Character>(Char: Constructor<Character>) {
    if (this._characters.length > Roster.MAX_CHARACTERS_COUNT) return;
    this._characters.push(new Char(this));
  }

  public removeCharacter<T extends Character>(Char: Constructor<T>) {
    this._characters = this._characters.filter((c) => !(c instanceof Char));
  }

  public switchCharacter<T extends Character>(_: number | Constructor<T>) {
    if(typeof _ == "number") {
      if(_ >= Roster.MAX_CHARACTERS_COUNT) return;
      if(_ < 0) return;
      this._index = _;
    } else {
      _ = this.findCharacterIndex(_);
      if(_ < 0) return;
      this._index = _;
    }
  }
}