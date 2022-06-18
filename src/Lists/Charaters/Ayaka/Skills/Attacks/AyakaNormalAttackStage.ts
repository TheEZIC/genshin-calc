import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import SkillArgs from "@/Skills/Args/SkillArgs";
import NormalAttackSkillStage from "@/Skills/NormalAttackSkillStage";

export default abstract class AyakaNormalAttackStage extends NormalAttackSkillStage {
  public targetType: SkillTargetType = SkillTargetType.Single;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

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