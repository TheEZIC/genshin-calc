import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export default class HoldAttackSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.HoldAttack;
  skillTypeName: string = "Charged attack";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.HoldAttackStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.HoldAttackEnded.notifyAll(args);
  }

  runBeforeDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.HoldAttackBeforeDamage.notifyAll(args);
  }

  runDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.HoldAttackDamage.notifyAll(args);
  }

  runHealListener(args: ICombatHealArgs): void {
    args.character.listeners.HoldAttackHeal.notifyAll(args);
  }

  runCreateShieldListener(args: ICombatShieldArgs): void {
    args.character.listeners.HoldAttackCreateShield.notifyAll(args);
  }
}
