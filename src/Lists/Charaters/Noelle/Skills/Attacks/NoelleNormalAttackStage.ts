import NormalAttackSkillStage from "@/Skills/Defaults/NormalAttackSkillStage";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";

export default abstract class NoelleNormalAttackStage extends NormalAttackSkillStage {
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
