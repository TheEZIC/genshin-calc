import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class NormalAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.NormalAttack;
  skillTypeName: string = "Normal attack";

  runStartListener(args: SkillArgs): void {
    args.character.listeners.NormalAttackStarted.notifyAll(args);
  }

  runEndListener(args: SkillArgs): void {
    args.character.listeners.NormalAttackEnded.notifyAll(args);
  }
}
