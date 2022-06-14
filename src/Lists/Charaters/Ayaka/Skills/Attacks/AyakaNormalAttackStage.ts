import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SkillValue from "@/Skills/SkillValue";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default abstract class AyakaNormalAttackStage extends NormalSkill {
  public countdownFrames: number = 0;
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.Single;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  protected abstract value: SkillValue;

  override onAction(args: SkillArgs): void {
    if (this.currentFrame === this.frames) {
      const {character} = args;
      const atk = character.calculatorStats.ATK.calc();
      const dmg = this.value.getDamage(this.lvl.current) * atk;
      const dmgArgs = new SkillDamageArgs({
        ...args,
        value: dmg,
      });

      this.doDamage(dmgArgs);
    }
  }
}
