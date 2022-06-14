import Skill from "@/Skills/Skill";
import Character from "@/Entities/Characters/Character";

export interface ISkillArgsParams {
  character: Character;
  skill: Skill;
  currentSkillIndex: number;
  skills: Skill[];
}

export interface ISkillArgs {
  hash: string;
  character: Character;
  currentSkillIndex: number;
  skill: Skill;
  skills: Skill[];
  prevSkill: Skill | null;
  nextSkill: Skill | null;
  prevSkills: Skill[];
  nextSkills: Skill[];
}

export default class SkillArgs implements ISkillArgs {
  private _hash: string;

  public get hash() {
    return this._hash;
  }

  public changeHash(skill: Skill) {
    this.skill = skill;
    this._hash = `${skill.title}${this.currentSkillIndex}`;
  }

  public readonly character: Character;

  public skill: Skill;
  public readonly currentSkillIndex: number;
  public readonly skills: Skill[];

  constructor(params: ISkillArgsParams) {
    this._hash = `${params.skill.title}${params.currentSkillIndex}`;

    this.character = params.character;

    this.skill = params.skill;
    this.skills = params.skills;
    this.currentSkillIndex = params.currentSkillIndex;
  }

  public get prevSkill(): Skill | null {
    return this.skills[this.currentSkillIndex - 1] ?? null;
  }

  public get nextSkill(): Skill | null {
    return this.skills[this.currentSkillIndex + 1] ?? null;
  }

  public get prevSkills(): Skill[] {
    return this.skills.filter((s, i) => i < this.currentSkillIndex);
  }

  public get nextSkills(): Skill[] {
    return this.skills.filter((s, i) => i > this.currentSkillIndex);
  }

  public get clone(): SkillArgs {
    return new SkillArgs({
      character: this.character,
      skill: this.skill,
      currentSkillIndex: this.currentSkillIndex,
      skills: this.skills,
    });
  }
}
