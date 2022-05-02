import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class BurstSkillStrategy extends SkillStrategy  {
  type: SkillType = SkillType.Burst;
  skillTypeName: string = "Burst";

  runStartListener(character: Character): void {
    character.listeners.BurstSkillStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.BurstSkillEnded.notifyAll({entity: character});
  }
}
