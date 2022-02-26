import Character from "@/Entities/Characters/Character";``
import Enemy from "@/Entities/Enemies/Enemy";
import {VisionType} from "@/VisionType";
import Skill from "@/Skills/Skill";
import Entity from "@/Entities/Entity";
import {injectable} from "inversify";

export interface ISkillsItem {
  character: Character;
  skill: Skill;
}

@injectable()
export default class Roster {
  public static readonly MAX_CHARACTERS_COUNT = 4;
  private _characters: Character[] = [];
  private _entities: Entity[] = [];

  private _index: number = 0;

  public get entities(): Enemy[] {
    return this._entities.filter(e => e instanceof Enemy) as Enemy[];
  }

  public get enemiesCount() {
    return this._entities.length;
  }

  public addEnemy() {
    this._entities.push(new Enemy());
  }

  public removeEnemy() {
    this._entities.slice(1);
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
