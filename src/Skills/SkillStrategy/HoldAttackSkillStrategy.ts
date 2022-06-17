import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {IHoldAttackSkill} from "@/Skills/SkillTypes/IHoldAttackSkill";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class HoldAttackSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.HoldAttack;
  skillTypeName: string = "Charged attack";

  runStartListener(args: SkillArgs): void {
    args.character.listeners.HoldAttackStarted.notifyAll(args);
  }

  runEndListener(args: SkillArgs) {
    args.character.listeners.HoldAttackEnded.notifyAll(args);
  }
}
