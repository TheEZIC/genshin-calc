import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class HoldAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.HoldAttack;

  protected override _hasInfusion = false;

  runStartListener(character: Character, startTime: number): void {
    character.listeners.HoldAttackStarted.notifyAll({entity: character, startTime});
  }

  runEndListener(character: Character, startTime: number) {
    character.listeners.HoldAttackEnded.notifyAll({entity: character, startTime});
  }
}
