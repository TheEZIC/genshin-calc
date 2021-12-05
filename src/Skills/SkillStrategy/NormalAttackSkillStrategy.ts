import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class NormalAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.NormalAttack;

  protected override _hasInfusion = false;

  runStartListener(character: Character, startTime: number): void {
    character.listeners.NormalAttackStarted.notifyAll({character, startTime});
  }

  runEndListener(character: Character, startTime: number): void {
    character.listeners.NormalAttackEnded.notifyAll({character, startTime});
  }
}
