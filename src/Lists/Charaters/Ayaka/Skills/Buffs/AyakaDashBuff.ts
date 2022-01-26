import Effect from "@/Effects/Effect";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class AyakaDashBuff extends Effect<Character> {
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
