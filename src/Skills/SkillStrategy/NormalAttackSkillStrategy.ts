import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {INormalAttackSkill} from "@/Skills/SkillTypes/INormalAttackSkill";

export default class NormalAttackSkillStrategy extends SkillStrategy<INormalAttackSkill> {
  type: SkillType = SkillType.NormalAttack;

  protected override _hasInfusion = false;

  runStartListener(character: Character): void {
    character.listeners.NormalAttackStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character): void {
    character.listeners.NormalAttackEnded.notifyAll({entity: character});
  }
}
