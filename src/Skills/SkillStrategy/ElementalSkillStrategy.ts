import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";
import {ICombatDamageArgs, ICombatHealArgs, ICombatShieldArgs} from "@/Skills/CombatActions";

export default class ElementalSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.Elemental;
  skillTypeName: string = "Elemental";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.ElementalSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.ElementalSkillEnded.notifyAll(args);
  }

  runBeforeDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.ElementalSkillBeforeDamage.notifyAll(args);
  }

  runDamageListener(args: ICombatDamageArgs): void {
    args.character.listeners.ElementalSkillDamage.notifyAll(args);
  }

  runHealListener(args: ICombatHealArgs): void {
    args.character.listeners.ElementalSkillHeal.notifyAll(args);
  }

  runCreateShieldListener(args: ICombatShieldArgs): void {
    args.character.listeners.ElementalSkillCreateShield.notifyAll(args);
  }
}
