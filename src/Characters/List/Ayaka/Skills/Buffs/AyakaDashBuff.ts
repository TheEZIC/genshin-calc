import Buff from "@/Buffs/Buff";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class AyakaDashBuff extends Buff {
  framesDuration: number = 5 * 60; //5sec

  applyEffect(character: Character): void {
    character.skillManager.getSkillByType(SkillType.NormalAttack)?.strategy.changeInfusion(true);
  }

  removeEffect(character: Character): void {
    character.skillManager.getSkillByType(SkillType.NormalAttack)?.strategy.changeInfusion(false);
  }
}