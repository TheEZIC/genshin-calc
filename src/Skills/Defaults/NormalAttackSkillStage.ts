import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import SkillValue from "@/Skills/SkillValue";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import Skill from "@/Skills/Skill";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";

export default abstract class NormalAttackSkillStage extends Skill implements IMultipleHitSkill {
  public countdownFrames: number = 0;
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);

  public hits: number = 1;

  protected abstract value: SkillValue;

  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  override onEnd(args: SkillArgs) {
    super.onEnd(args);

    const {character} = args;
    const atk = character.calculatorStats.ATK.calc(this.strategy.type);
    const dmg = this.value.getDamage(this.lvl.current) * atk;
    const dmgArgs = new SkillDamageArgs({
      ...args,
      hits: this.hits,
      value: dmg,
    });

    this.doDamage(dmgArgs);
  }
}
