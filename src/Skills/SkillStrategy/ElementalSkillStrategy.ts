import SkillStrategy from "@/Skills/SkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class ElementalSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Elemental;
  skillTypeName: string = "Elemental";

  runStartListener(args: SkillArgs): void {
    args.character.listeners.ElementalSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillArgs) {
    args.character.listeners.ElementalSkillEnded.notifyAll(args);
  }
}
