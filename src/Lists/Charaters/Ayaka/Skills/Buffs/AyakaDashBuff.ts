import OverridableEffect from "@/Effects/OverridableEffect";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import Effect from "@/Effects/Effect";

export default class AyakaDashBuff extends OverridableEffect<Character> {
  framesDuration: number = 5 * 60; //5sec

  protected applyEffect(character: Character): void {
    character.skillManager
      .getAllSkillsByType(SkillType.NormalAttack)
      ?.map((s) => s.strategy.changeInfusion(true));
  }

  protected removeEffect(character: Character): void {
    character.skillManager
      .getAllSkillsByType(SkillType.NormalAttack)
      ?.map((s) => s.strategy.changeInfusion(false));
  }
}
