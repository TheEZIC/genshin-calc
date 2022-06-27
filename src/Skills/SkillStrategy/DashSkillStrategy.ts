import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import {IOnSkillAction, IOnSkillDamage} from "@/Roster/GlobalListeners";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";

export default class DashSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.Dash;
  skillTypeName: string = "Dash";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.DashSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.DashSkillEnded.notifyAll(args);
  }

  runBeforeDamageListener(args: IOnSkillDamage): void {
    args.character.listeners.DashSkillBeforeDamage.notifyAll(args);
  }

  runDamageListener(args: IOnSkillDamage): void {
    args.character.listeners.DashSkillDamage.notifyAll(args);
  }

  runHealListener(args: IOnSkillAction): void {
    args.character.listeners.DashSkillHeal.notifyAll(args);
  }

  runCreateShieldListener(args: IOnSkillAction): void {
    args.character.listeners.DashSkillCreateShield.notifyAll(args);
  }
}
