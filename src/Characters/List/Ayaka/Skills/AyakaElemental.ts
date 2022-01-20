import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";

export default class AyakaElemental extends NormalSkill {
  strategy: SkillStrategy = new ElementalSkillStrategy(this);

  frames: number = 56;
  protected value: SkillValue = new SkillValue(239.2, 257.14 - 239.2);

  protected calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
