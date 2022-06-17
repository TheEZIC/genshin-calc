import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class DashSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Dash;
  skillTypeName: string = "Dash";

  runStartListener(args: SkillArgs): void {
    args.character.listeners.DashSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillArgs) {
    args.character.listeners.DashSkillEnded.notifyAll(args);
  }
}
