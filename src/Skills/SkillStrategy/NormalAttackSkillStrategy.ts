import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class NormalAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.NormalAttack;

  protected override _hasInfusion = false;

  runListener(character: Character, startTime: number): void {
    character.skillManager.listeners.NormalAttackStarted.notifyAll({character, startTime});
  }
}