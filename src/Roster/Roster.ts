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

  public get entities(): Entity[] {
    return this._entities;
  }

  public getEntity(entity: Entity) {
    return this._entities.find(e => e.name === entity.name);
  }

  public addEntity(entity: Entity) {
    this._entities.push(entity);
  }

  public removeEntity(entity: Entity) {
    const index = this._entities.findIndex(e => e.name === entity.name);

    if (index !== -1) {
      this._entities.slice(index);
    }
  }

  public removeAllEntities(entity: Entity) {
    this._entities = this._entities.filter(e => e.name !== e.name);
  }

  public get enemies(): Enemy[] {
    return this._entities.filter(e => e instanceof Enemy) as Enemy[];
  }

  public get enemiesCount() {
    return this.enemies.length;
  }

  public addEnemy(enemy: Enemy) {
    this.addEntity(enemy);
  }

  public removeEnemy(enemy: Enemy) {
    this.removeEntity(enemy);
  }

  public get characters() {
    return this._characters;
  }

  public get charactersSkills(): ISkillsItem[] {
    return this.characters.map((char) => char.skillManager.allSkills.map((s) => ({ skill: s, character: char }))).flat();
  }

  public changeActiveCharacter(character: Character) {
    const index = this.characters.findIndex(c => c.name === character.name);

    if (index !== -1) {
      this._index = index;
    }
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
