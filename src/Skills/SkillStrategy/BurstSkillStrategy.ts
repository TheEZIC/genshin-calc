import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import {IOnSkillAction, IOnSkillDamage} from "@/Roster/GlobalListeners";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";

export default class BurstSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.Burst;
  skillTypeName: string = "Burst";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.BurstSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.BurstSkillEnded.notifyAll(args);
  }

  runDamageListener(args: IOnSkillDamage): void {
    args.character.listeners.BurstSkillDamage.notifyAll(args);
  }

  runHealListener(args: IOnSkillAction): void {
    args.character.listeners.BurstSkillHeal.notifyAll(args);
  }

  runCreateShieldListener(args: IOnSkillAction): void {
    args.character.listeners.BurstSkillCreateShield.notifyAll(args);
  }
}
