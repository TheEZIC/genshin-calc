import Character from "@/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";

export default class AyakaElemental extends NormalSkill {
  public strategy: SkillStrategy = new ElementalSkillStrategy(this);

  public frames: number = 56;
  protected value: SkillValue = new SkillValue(239.2, 257.14 - 239.2);

  public skillTargetType: SkillTargetType = SkillTargetType.AOE;

  protected calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
