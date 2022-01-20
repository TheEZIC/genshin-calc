import Character from "@/Characters/Character";
import Skill from "./Skill";
import { SkillType } from "./SkillType";
import {isIWithInitializedEffects, IWithInitializedEffects} from "@/Effects/IWithEffects";

export default class SkillsManager {
  private skills: Skill[] = [];

  constructor(public character: Character, skills: Skill[]) {
    for (let skill of skills) {
      if (isIWithInitializedEffects(skill)) {
        (skill as unknown as IWithInitializedEffects<Character>).subscribeEffects(character);
      }

      this.skills.push(skill);
    }
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
