import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class ElementalSkillStrategy extends SkillStrategy {
  type: SkillType = SkillType.Elemental;
  skillTypeName: string = "Elemental";

  runStartListener(character: Character): void {
    character.listeners.ElementalSkillStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.ElementalSkillEnded.notifyAll({entity: character});
  }
}
