import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";

export default abstract class AyakaNormalAttack extends NormalSkill {
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);

  protected override calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
