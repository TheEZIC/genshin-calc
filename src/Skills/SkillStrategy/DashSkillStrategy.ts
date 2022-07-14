import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export default class DashSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.Dash;
  skillTypeName: string = "Dash";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.DashSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.DashSkillEnded.notifyAll(args);
  }

  runBeforeDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.DashSkillBeforeDamage.notifyAll(args);
  }

  runDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.DashSkillDamage.notifyAll(args);
  }

  runHealListener(args: ICombatHealArgs): void {
    args.character.listeners.DashSkillHeal.notifyAll(args);
  }

  runCreateShieldListener(args: ICombatShieldArgs): void {
    args.character.listeners.DashSkillCreateShield.notifyAll(args);
  }
}
