import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class DashSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Dash;
  protected override _hasInfusion = false;

  runStartListener(character: Character, startTime: number): void {
    character.listeners.DashSkillStarted.notifyAll({character, startTime});
  }

  runEndListener(character: Character, startTime: number) {
    character.listeners.DashSkillEnded.notifyAll({character, startTime});
  }
}
