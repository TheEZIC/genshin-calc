import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class BurstSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Burst;

  runStartListener(character: Character, startTime: number): void {
    character.listeners.BurstSkillStarted.notifyAll({character, startTime});
  }

  runEndListener(character: Character, startTime: number) {
    character.listeners.BurstSkillEnded.notifyAll({character, startTime});
  }
}
