import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {IHoldAttackSkill} from "@/Skills/SkillTypes/IHoldAttackSkill";
import SkillArgs from "@/Skills/Args/SkillArgs";
import {IOnSkillAction, IOnSkillDamage} from "@/Roster/GlobalListeners";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";

export default class HoldAttackSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.HoldAttack;
  skillTypeName: string = "Charged attack";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.HoldAttackStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.HoldAttackEnded.notifyAll(args);
  }

  runDamageListener(args: IOnSkillDamage): void {
    args.character.listeners.HoldAttackDamage.notifyAll(args);
  }

  runHealListener(args: IOnSkillAction): void {
    args.character.listeners.HoldAttackHeal.notifyAll(args);
  }

  runCreateShieldListener(args: IOnSkillAction): void {
    args.character.listeners.HoldAttackCreateShield.notifyAll(args);
  }
}
