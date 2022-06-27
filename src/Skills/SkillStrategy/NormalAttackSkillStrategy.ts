import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import {IOnSkillAction, IOnSkillDamage} from "@/Roster/GlobalListeners";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";

export default class NormalAttackSkillStrategy extends SkillStrategy implements ISkillStrategy{
  type: SkillType = SkillType.NormalAttack;
  skillTypeName: string = "Normal attack";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.NormalAttackStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs): void {
    args.character.listeners.NormalAttackEnded.notifyAll(args);
  }

  runBeforeDamageListener(args: IOnSkillDamage): void {
    args.character.listeners.NormalAttackBeforeDamage.notifyAll(args);
  }

  runDamageListener(args: IOnSkillDamage): void {
    args.character.listeners.NormalAttackDamage.notifyAll(args);
  }

  runHealListener(args: IOnSkillAction): void {
    args.character.listeners.NormalAttackHeal.notifyAll(args);
  }

  runCreateShieldListener(args: IOnSkillAction): void {
    args.character.listeners.NormalAttackCreateShield.notifyAll(args);
  }
}
