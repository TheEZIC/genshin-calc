import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class BurstSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Burst;

  runListener(character: Character, startTime: number): void {
    character.skillManager.listeners.BurstSkillStarted.notifyAll({character, startTime});
  }
}