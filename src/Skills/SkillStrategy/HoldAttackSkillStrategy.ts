import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {IHoldAttackSkill} from "@/Skills/SkillTypes/IHoldAttackSkill";

export default class HoldAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.HoldAttack;

  protected override _hasInfusion = false;

  runStartListener(character: Character): void {
    character.listeners.HoldAttackStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.HoldAttackEnded.notifyAll({entity: character});
  }
}
