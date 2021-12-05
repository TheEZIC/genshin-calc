import Buff from "@/Buffs/Buff";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class AyakaDashBuff extends Buff {
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
