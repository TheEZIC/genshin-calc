import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import {SkillType} from "@/Skills/SkillType";
import SkillValue from "@/Skills/SkillValue";

export default class AyakaElemental extends NormalSkill {
  type: SkillType = SkillType.Elemental;

  frames: number = 56;
  protected value: SkillValue = new SkillValue(239.2, 257.14 - 239.2);

  protected calcDamage(character: Character): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
