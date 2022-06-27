import XianglingNormalAttackStage from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {SkillTargetType} from "@/Skills/SkillTargetType";

export default class XianglingA5 extends XianglingNormalAttackStage {
  public skillName: string = "Dough-Fu A5";

  public frames: number = 167;
  public value: SkillValue = new SkillValue(71.04, 76.82, 90.86);

  private runC4Explosion(args: SkillArgs) {
    const {character} = args;

    args.damageCalculator.addDelayedAction({
      delay: 2 * 60,
      run: () => {
        const atk = character.calculatorStats.ATK.calc(this.strategy.type);
        const dmg = atk * 0.75;
        const dmgArgs = new SkillDamageArgs({
          ...args,
          value: dmg,
          targetType: SkillTargetType.AOE,
          elementalStatus: new PyroStatus(1),
        });

        this.doDamage(dmgArgs, "Xiangling C2 explosion")
      }
    });
  }

  override onEnd(args: SkillArgs) {
    super.onEnd(args);

    const {character} = args;

    if (character.constellationsManager.current >= 4) {
      this.runC4Explosion(args);
    }
  }
}
