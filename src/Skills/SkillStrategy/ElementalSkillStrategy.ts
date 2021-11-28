import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class ElementalSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Elemental;

  protected override _hasInfusion = false;

  runListener(character: Character, startTime: number): void {
    character.skillManager.listeners.ElementalSkillStarted.notifyAll({character, startTime});
  }
}