import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class DashSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Dash;
  protected override _hasInfusion = false;

  runListener(character: Character, startTime: number): void {
    character.skillManager.listeners.DashSkillStarted.notifyAll({character, startTime});
  }
}