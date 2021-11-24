import Character from "@/Characters/Character";
import { Constructor } from "@/Helpers/Constructor";
import Skill from "@/Skills/Skill";
import NormalSkill from "@/Skills/NormalSkill";
import SummonSkill from "@/Skills/SummonSkill";
import DashSkill from "@/Skills/DashSkill";
import RosterBuffsManager from "@/Buffs/BuffsManager";

interface ISkillsItem {
  character: Character;
  skill: Skill;
}

export default class Roster {
  public static readonly MAX_CHARACTERS_COUNT = 4;
  private _characters: Character[] = [];
  private _index: number = 0;

  public buffsManager: RosterBuffsManager = new RosterBuffsManager();

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

  private getCharactersSkills(): ISkillsItem[] {
    return this._characters.map((char) => char.skillManager.allSkills.map((s) => ({ skill: s, character: char }))).flat();
  }

  private calcRotationDuration(skills: ISkillsItem[], rotationSkills: Skill[]): number {
    return rotationSkills.reduce((a, b, index) => {
      const skillItemIndex = skills.findIndex((s) => s.skill.name === b.name);

      if (skillItemIndex === -1) return a;

      const skillItem = skills[skillItemIndex];
      const nextSkill: Skill | undefined = skills[skillItemIndex + 1].skill;
      const prevSkill: Skill | undefined = skills[skillItemIndex - 1].skill;

      const { skill } = skillItem;
      let temp = 0;

      if (skill instanceof NormalSkill) {
        temp += skill.frames;
      }

      if (skill instanceof SummonSkill) {
        const remainingSkills = rotationSkills.slice(index + 1);
        const remainingSkillsFrames = remainingSkills.reduce((c, d) => c + d.frames, 0);

        temp += skill.summonUsageFrames;

        if (skill.summonDurationFrames > remainingSkillsFrames) {
          temp += skill.summonDurationFrames - remainingSkillsFrames;
        }
      }

      if (skill instanceof NormalSkill
        && nextSkill instanceof DashSkill
        && skill.canBeCanceled
      ) {
        temp -= skill.frames - skill.canceledFrames;
      }

      return a + temp;
    }, 0);
  }

  public calcRotation(rotationSkills: Skill[]): number {
    const skills = this.getCharactersSkills();
    const totalFramesDuration = this.calcRotationDuration(skills, rotationSkills);
    const totalSecondsDuration = totalFramesDuration / 60;

    let totalRotationDmg = 0;

    for (let rotationSkill of rotationSkills) {
      
    }

    return totalRotationDmg / totalSecondsDuration;
  }
}