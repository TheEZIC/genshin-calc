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

  private calcRotationSkillDuration(
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

  private calcSkillDuration(skill: Skill) {
    if (skill instanceof SummonSkill)
      return skill.summonUsageFrames;

    return skill.frames;
  }

  public calcRotation(rotationSkills: Skill[]): number {
    const rosterSkills = this.getCharactersSkills();

    interface IOngoingSkill {
      startTime: number;
      skill: Skill;
    }

    let ongoingSkills: IOngoingSkill[] = [];
    let totalRotationDmg: number = 0
    let rotationFrames: number = 0;
    let frames: number = 0;

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = rosterSkills.find((s) => s.skill.name === rotationSkill.name);

      if (!skillItem) continue;

      const {skill, character} = skillItem;

      //push to active skills
      ongoingSkills.push({
        startTime: frames,
        skill,
      });

      character.ongoingEffects.forEach((b) => b.update(character, frames));
      totalRotationDmg += skill.getDamage(character, frames);

      //run something if skill end
      ongoingSkills
        .filter((s) => s.startTime + s.skill.frames < frames)
        .forEach((s) => s.skill.strategy.runEndListener(character, frames));

      //remove ended skills from active skills array
      ongoingSkills = ongoingSkills.filter((s) => !(s.startTime + s.skill.frames < frames));

      console.log(frames, skill.name, character.ongoingEffects.map(b => b.name));

      frames += this.calcSkillDuration(skill);
      rotationFrames += this.calcRotationSkillDuration(rosterSkills, rotationSkills, rotationSkill, i);
    }

    return totalRotationDmg / (rotationFrames / 60);
  }
}
