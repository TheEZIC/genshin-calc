import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import {ISkillActionArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SkillValue from "@/Skills/SkillValue";

export default abstract class AyakaNormalAttack extends NormalSkill {
  public countdownFrames: number = 0;
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.Single;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  protected abstract value: SkillValue;

  override onAction(args: ISkillActionArgs): void {
    if (this.currentFrame === 1) {
      const {character} = args;
      const atk = character.calculatorStats.ATK.calc();
      const dmg = this.value.getDamage(this.lvl.current) * atk;
      this.doDamage({
        ...args,
        value: dmg,
      });
    }
  }
}
