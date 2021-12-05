import Character from "@/Characters/Character";

import NormalSkill from "./NormalSkill";
import Skill from "./Skill";
import { SkillType } from "./SkillType";
import SummonSkill from "./SummonSkill";
import SkillsListeners from "@/Skills/SkillsListeners";

export default class SkillsManager {
  private skills: Skill[] = [];

  constructor(public character: Character, skills: Skill[]) {
    skills.forEach((s) => {
      s.initBuffs(this.character);
      this.skills.push(s);
    });
  }

  public get allSkills() {
    return this.skills;
  }

  public changeLvl(lvl: number, skillType: SkillType) {
    this.skills
      .filter((s) => s.strategy.type === skillType)
      .forEach((s) => s.changeLvl(lvl));
  }

  public getSkillByType(skillType: SkillType): Skill | undefined {
    return this.skills.find((s) => s.strategy.type === skillType);
  }

  public getAllSkillsByType(skillType: SkillType): Skill[] {
    return this.skills.filter((s) => s.strategy.type === skillType);
  }
}
