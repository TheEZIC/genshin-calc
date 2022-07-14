import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export default class BurstSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.Burst;
  skillTypeName: string = "Burst";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.BurstSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.BurstSkillEnded.notifyAll(args);
  }

  runBeforeDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.BurstSkillBeforeDamage.notifyAll(args);
  }

  runDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.BurstSkillDamage.notifyAll(args);
  }

  runHealListener(args: ICombatHealArgs): void {
    args.character.listeners.BurstSkillHeal.notifyAll(args);
  }

  runCreateShieldListener(args: ICombatShieldArgs): void {
    args.character.listeners.BurstSkillCreateShield.notifyAll(args);
  }
}
