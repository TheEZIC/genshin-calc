import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class ElementalSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Elemental;

  protected override _hasInfusion = false;

  runStartListener(character: Character): void {
    character.listeners.ElementalSkillStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.ElementalSkillEnded.notifyAll({entity: character});
  }
}
