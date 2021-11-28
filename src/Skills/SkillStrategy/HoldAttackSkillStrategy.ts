import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class HoldAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.HoldAttack;

  protected override _hasInfusion = false;

  runListener(character: Character, startTime: number): void {
    character.skillManager.listeners.HoldAttackStarted.notifyAll({character, startTime});
  }
}