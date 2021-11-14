import Skill from "./Skill";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default abstract class DashSkill extends Skill {
  type = SkillType.Dash;

  protected calcDamage(character: Character): number {
    return 0;
  }
}