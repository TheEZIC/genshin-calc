import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {IDashSkill} from "@/Skills/SkillTypes/IDashSkill";

export default class DashSkillStrategy extends SkillStrategy<IDashSkill> {
  type: SkillType = SkillType.Dash;
  protected override _hasInfusion = false;

  runStartListener(character: Character): void {
    character.listeners.DashSkillStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.DashSkillEnded.notifyAll({entity: character});
  }
}
