import Character from "@/Entities/Characters/Character";``
import Enemy from "@/Entities/Enemies/Enemy";
import {VisionType} from "@/VisionType";
import Skill from "@/Skills/Skill";
import {singleton} from "tsyringe";

export interface ISkillsItem {
  character: Character;
  skill: Skill;
}

@singleton()
export default class Roster {
  public static readonly MAX_CHARACTERS_COUNT = 4;
  private _characters: Character[] = [];
  private _enemies: Enemy[] = [];

  private _index: number = 0;

  public get enemies(): Enemy[] {
    return this._enemies;
  }

  public get enemiesCount() {
    return this._enemies.length;
  }

  public addEnemy() {
    this._enemies.push(new Enemy());
  }

  public removeEnemy() {
    this._enemies.slice(1);
  }

  public get characters() {
    return this._characters;
  }

  public get charactersSkills(): ISkillsItem[] {
    return this.characters.map((char) => char.skillManager.allSkills.map((s) => ({ skill: s, character: char }))).flat();
  }

  public get activeCharacter() {
    return this.characters[this._index];
  }

  public get inactiveCharacters() {
    return this.characters.filter((c, i) => i !== this._index);
  }

  public isInactive(character: Character): boolean {
    const inactive = this.inactiveCharacters;
    return Boolean(inactive.find(c => c.name === character.name));
  }

  public isActive(character: Character): boolean {
    const active = this.activeCharacter;
    return active.name === character.name;
  }

  public findCharacterByVision(vision: VisionType) {
    return this.characters.filter(c => c.vision === vision);
  }

  public addCharacter(character: Character) {
    if (this._characters.length > Roster.MAX_CHARACTERS_COUNT) return;
    this._characters.push(character);
  }

  public removeCharacter(character: Character) {
    this._characters = this._characters.filter((c) => c.name !== character.name);
  }
}
