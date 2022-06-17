import SkillStrategy from "@/Skills/SkillStrategy";
import NormalAttackSkillStrategy from "@/Skills/SkillStrategy/NormalAttackSkillStrategy";
import SkillValue from "@/Skills/SkillValue";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import Skill from "@/Skills/Skill";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";

export default abstract class NormalAttackSkillStage extends Skill implements IMultipleHitSkill {
  public countdownFrames: number = 0;
  public strategy: SkillStrategy = new NormalAttackSkillStrategy(this);

  public hits: number = 1;

  protected abstract value: SkillValue;

  override onAction(args: SkillArgs): void {
  }

  override onEnd(args: SkillArgs) {
    const {character} = args;
    const atk = character.calculatorStats.ATK.calc();
    const dmg = this.value.getDamage(this.lvl.current) * atk;
    const dmgArgs = new SkillDamageArgs({
      ...args,
      hits: this.hits,
      value: dmg,
    });

    this.doDamage(dmgArgs);
  }
}
