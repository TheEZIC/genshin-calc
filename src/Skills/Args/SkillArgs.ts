import Skill from "@/Skills/Skill";
import DamageCalculator from "@/Roster/DamageCalculator";
import Character from "@/Entities/Characters/Character";

export interface ISkillArgsParams {
  character: Character;
  skill: Skill;
  currentSkillIndex: number;
  skills: Skill[];
  damageCalculator: DamageCalculator;
}

export default class SkillArgs {
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

  public readonly damageCalculator: DamageCalculator;

  constructor(params: ISkillArgsParams) {
    this._hash = `${params.skill.title}${params.currentSkillIndex}`;

    this.character = params.character;

    this.skill = params.skill;
    this.skills = params.skills;
    this.currentSkillIndex = params.currentSkillIndex;

    this.damageCalculator = params.damageCalculator
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
      damageCalculator: this.damageCalculator,
    });
  }
}
