import Character from "@/Entities/Characters/Character";``
import Enemy from "@/Entities/Enemies/Enemy";
import {VisionType} from "@/VisionType";
import Skill from "@/Skills/Skill";
import Entity from "@/Entities/Entity";
import SingletonsManager from "@/Singletons/SingletonsManager";
import CharactersFactory from "@/Factories/CharactersFactory";
import Listener from "@/Helpers/Listener";
import DamageCalculator from "@/Roster/DamageCalculator";
import Effect from "@/Effects/Effect";

export interface ISkillsItem {
  character: Character;
  skill: Skill;
}

export default class Roster extends Entity {
  public title: string = "Roster";

  constructor(
    damageCalculator: DamageCalculator,
  ) {
    super();
    this.damageCalculator = damageCalculator;
  }

  public addRosterEffect(effect: Effect<any>) {
    for (let character of this.characters) {
      effect.activate(character);
    }
  }

  public static readonly MAX_CHARACTERS_COUNT = 4;
  private _characters: Character[] = [];
  private _entities: Entity[] = [];

  private _index: number = 0;

  public get entities(): Entity[] {
    return this._entities;
  }

  public clearEntities() {
    this._entities = [];
  }

  public getEntity(entity: Entity) {
    return this._entities.find(e => e.title === entity.title);
  }

  public addEntity(entity: Entity) {
    entity.damageCalculator = this.damageCalculator;
    this._entities.push(entity);
  }

  public removeEntity(entity: Entity) {
    const index = this._entities.findIndex(e => e.title === entity.title);

    if (index !== -1) {
      this._entities = this._entities.filter((e, i) => i !== index);
    }
  }

  public removeAllEntities(entity: Entity) {
    this._entities = this._entities.filter(e => e.title !== e.title);
  }

  public get enemies(): Enemy[] {
    return this._entities.filter(e => e instanceof Enemy) as Enemy[];
  }

  public get enemiesCount() {
    return this.enemies.length;
  }

  public addEnemy(enemy: Enemy) {
    enemy.damageCalculator = this.damageCalculator;
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

  public checkSkillExistence(skill: Skill) {
    const charactersSkills = this.charactersSkills;
    return charactersSkills.find((s) => s.skill.title === skill.title);
  }

  public onCharacterSwap: Listener<Character> = new Listener<Character>();

  public changeActiveCharacter(character: Character) {
    const index = this.characters.findIndex(c => c.title === character.title);

    if (index !== -1) {
      this._index = index;
      this.onCharacterSwap.notifyAll(character);
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
    return Boolean(inactive.find(c => c.title === character.title));
  }

  public isActive(character: Character): boolean {
    const active = this.activeCharacter;
    return active.title === character.title;
  }

  public findCharacterByVision(vision: VisionType) {
    return this.characters.filter(c => c.vision === vision);
  }

  public addCharacter(character: Character) {
    character.damageCalculator = this.damageCalculator;
    if (this._characters.length > Roster.MAX_CHARACTERS_COUNT) return;
    this._characters.push(character);
  }

  public removeCharacter(character: Character) {
    this._characters = this._characters.filter((c) => c.title !== character.title);
  }

  public clearCharacters() {
    this._characters = [];
  }
}
