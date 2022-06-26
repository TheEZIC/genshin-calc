import SkillStrategy, {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import {IOnSkillAction, IOnSkillDamage} from "@/Roster/GlobalListeners";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";

export default class ElementalSkillStrategy extends SkillStrategy implements ISkillStrategy {
  type: SkillType = SkillType.Elemental;
  skillTypeName: string = "Elemental";

  runStartListener(args: SkillListenerArgs): void {
    args.character.listeners.ElementalSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillListenerArgs) {
    args.character.listeners.ElementalSkillEnded.notifyAll(args);
  }

  runDamageListener(args: IOnSkillDamage): void {
  }

  runHealListener(args: IOnSkillAction): void {
  }

  runCreateShieldListener(args: IOnSkillAction): void {
  }
}
