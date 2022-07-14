import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export default class NormalAttackSkillStrategy extends SkillStrategy implements ISkillStrategy{
  type: SkillType = SkillType.NormalAttack;
  skillTypeName: string = "Normal attack";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.NormalAttackStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs): void {
    args.character.listeners.NormalAttackEnded.notifyAll(args);
  }

  runBeforeDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.NormalAttackBeforeDamage.notifyAll(args);
  }

  runDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.NormalAttackDamage.notifyAll(args);
  }

  runHealListener(args: ICombatHealArgs): void {
    args.character.listeners.NormalAttackHeal.notifyAll(args);
  }

  runCreateShieldListener(args: ICombatShieldArgs): void {
    args.character.listeners.NormalAttackCreateShield.notifyAll(args);
  }
}
