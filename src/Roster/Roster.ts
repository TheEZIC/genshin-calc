import Character from "@/Characters/Character";
import {Constructor} from "@/Helpers/Constructor";
import Skill from "@/Skills/Skill";
import NormalSkill from "@/Skills/NormalSkill";
import SummonSkill from "@/Skills/SummonSkill";
import RosterBuffsManager from "@/Buffs/RosterBuffsManager";
import {SkillType} from "@/Skills/SkillType";

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

  public addCharacter(character: Character) {
    if (this._characters.length > Roster.MAX_CHARACTERS_COUNT) return;
    this._characters.push(character);
  }

  public removeCharacter(character: Character) {
    this._characters = this._characters.filter((c) => c.name !== character.name);
  }

  // public switchCharacter<T extends Character>(_: number | Constructor<T>) {
  //   if(typeof _ == "number") {
  //     if(_ >= Roster.MAX_CHARACTERS_COUNT) return;
  //     if(_ < 0) return;
  //     this._index = _;
  //   } else {
  //     _ = this.findCharacterIndex(_);
  //     if(_ < 0) return;
  //     this._index = _;
  //   }
  // }

  private getCharactersSkills(): ISkillsItem[] {
    return this._characters.map((char) => char.skillManager.allSkills.map((s) => ({ skill: s, character: char }))).flat();
  }

  public calcSkillDuration(
    skills: ISkillsItem[],
    rotationSkills: Skill[],
    rotationSkill: Skill,
    rotationSkillIndex: number,
  ): number {
    const skillItemIndex = skills.findIndex((s) => s.skill.name === rotationSkill.name);

    if (skillItemIndex === -1) return 0;

    const skillItem = skills[skillItemIndex];
    const nextSkill: Skill | undefined = skills[skillItemIndex + 1]?.skill;
    const prevSkill: Skill | undefined = skills[skillItemIndex - 1]?.skill;

    const { skill } = skillItem;
    let temp = 0;

    if (skill instanceof NormalSkill) {
      temp += skill.frames;
    }

    if (skill instanceof SummonSkill) {
      const remainingSkills = rotationSkills.slice(rotationSkillIndex + 1);
      const remainingSkillsFrames = remainingSkills.reduce((c, d) => c + d.frames, 0);

      temp += skill.summonUsageFrames;

      if (skill.summonDurationFrames > remainingSkillsFrames) {
        temp += skill.summonDurationFrames - remainingSkillsFrames;
      }
    }

    if (skill instanceof NormalSkill
      && nextSkill?.strategy.type === SkillType.Dash
      && skill.canBeCanceled
    ) {
      temp -= skill.frames - skill.canceledFrames;
    }

    return temp;
  }

  private calcRotationDuration(skills: ISkillsItem[], rotationSkills: Skill[]): number {
    return rotationSkills.reduce((a, b, index) => {
      return a + this.calcSkillDuration(skills, rotationSkills, b, index);
    }, 0);
  }

  public calcRotation(rotationSkills: Skill[]): number {
    const rosterSkills = this.getCharactersSkills();
    const totalFramesDuration = this.calcRotationDuration(rosterSkills, rotationSkills);
    const totalSecondsDuration = totalFramesDuration / 60;

    let totalRotationDmg = 0
    let frames = 0;

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = rosterSkills.find((s) => s.skill.name === rotationSkill.name);

      if (!skillItem) continue;

      const {skill, character} = skillItem;

      totalRotationDmg += skillItem.skill.getDamage(character, frames);
      frames += this.calcSkillDuration(rosterSkills, rotationSkills, rotationSkill, i);
      console.log(frames);
    }

    return totalRotationDmg / totalSecondsDuration;
  }
}