import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";

export default abstract class AyakaNormalAttack extends NormalSkill {
  public countdownFrames: number = 0;
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.Single;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  protected override calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
