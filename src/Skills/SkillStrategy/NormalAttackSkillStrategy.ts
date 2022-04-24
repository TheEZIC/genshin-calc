import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class NormalAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.NormalAttack;

  runStartListener(character: Character): void {
    character.listeners.NormalAttackStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character): void {
    character.listeners.NormalAttackEnded.notifyAll({entity: character});
  }
}
