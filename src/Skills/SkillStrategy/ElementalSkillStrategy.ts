import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class ElementalSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Elemental;

  protected override _hasInfusion = false;

  runStartListener(character: Character, startTime: number): void {
    character.listeners.ElementalSkillStarted.notifyAll({character, startTime});
  }

  runEndListener(character: Character, startTime: number) {
    character.listeners.ElementalSkillEnded.notifyAll({character, startTime});
  }
}
