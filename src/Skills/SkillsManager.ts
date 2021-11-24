import Character from "@/Characters/Character";

import NormalSkill from "./NormalSkill";
import Skill from "./Skill";
import { SkillType } from "./SkillType";
import SummonSkill from "./SummonSkill";
import BuffManager from "@/Buffs/BuffManager";

export default class SkillsManager {
  constructor(public character: Character, private skills: Skill[]) {}

  public get allSkills() {
    return this.skills;
  }

  public buffs: BuffManager = new BuffManager(this.character)

  public changeLvl(lvl: number, skillType: SkillType) {
    this.skills
      .filter((s) => s.type === skillType)
      .forEach((s) => s.changeLvl(lvl));
  }

  public getSkillByType(skillType: SkillType) {
    return this.skills.find((s) => s.type === skillType);
  }
}
