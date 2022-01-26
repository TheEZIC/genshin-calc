import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class DashSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Dash;
  protected override _hasInfusion = false;

  runStartListener(character: Character): void {
    character.listeners.DashSkillStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.DashSkillEnded.notifyAll({entity: character});
  }
}
