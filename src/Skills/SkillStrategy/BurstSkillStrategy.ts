import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class BurstSkillStrategy extends SkillStrategy  {
  type: SkillType = SkillType.Burst;
  skillTypeName: string = "Burst";

  runStartListener(args: SkillArgs): void {
    args.character.listeners.BurstSkillStarted.notifyAll(args);
  }

  runEndListener(args: SkillArgs) {
    args.character.listeners.BurstSkillEnded.notifyAll(args);
  }
}
