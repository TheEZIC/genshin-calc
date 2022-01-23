import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";

export default abstract class AyakaNormalAttack extends NormalSkill {
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);
  skillTargetType: SkillTargetType = SkillTargetType.Single;

  protected override calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
