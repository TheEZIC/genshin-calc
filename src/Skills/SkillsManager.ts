import Listener from "@/Helpers/Listener";
import Character from "@/Entities/Characters/Character";
import Skill from "./Skill";
import { SkillType } from "./SkillType";

export default class SkillsManager {
  private skills: Skill[] = [];

  constructor(public character: Character, skills: Skill[]) {
    for (let skill of skills) {
      skill.subscribeEffects(character);
      this.skills.push(skill);
    }
  }

  public get allSkills() {
    return this.skills;
  }

  public changeLvl(lvl: number, skillType: SkillType) {
    this.skills
      .filter((s) => s.strategy.type === skillType)
      .forEach((s) => s.lvl.current = lvl);
  }

  public getSkillByType(skillType: SkillType): Skill | undefined {
    return this.skills.find((s) => s.strategy.type === skillType);
  }

  public getAllSkillsByType(skillType: SkillType): Skill[] {
    return this.skills.filter((s) => s.strategy.type === skillType);
  }

  public getAllSkillsByTypes(skillTypes: SkillType[]): Skill[] {
    return this.skills.filter((s) => skillTypes.includes(s.strategy.type));
  }
}
