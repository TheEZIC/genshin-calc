import HoldAttackSkill from "@/Skills/Defaults/HoldAttackSkill";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import HoldAttackSkillStrategy from "@/Skills/SkillStrategy/HoldAttackSkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import AyakaC6Buff from "@/Lists/Charaters/Ayaka/Constellation/Effects/AyakaC6Buff";
import NormalAttackSkill from "@/Skills/Defaults/NormalAttackSkill";
import AyakaA1 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA3";
import AyakaA4 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA4";
import Skill from "@/Skills/Skill";
import NormalAttackSkillStage from "@/Skills/Defaults/NormalAttackSkillStage";

export default class AyakaHoldAttack extends HoldAttackSkill implements IMultipleHitSkill {
  public skillName: string = "Kamisato Art: Kabuki";

  public frames: number = 0;
  public override hits: number = 3;

  private C6Bonus: number = 298;

  protected value: SkillValue = new SkillValue(55.13 * this.hits, 59.61 * this.hits, 70.51 * this.hits);
  private C6Value: SkillValue = new SkillValue(
(55.13 + this.C6Bonus) * this.hits,
(59.61 + this.C6Bonus) * this.hits,
(70.51 + this.C6Bonus) * this.hits,
  );

  protected override onAwake(args: SkillArgs) {
    super.onAwake(args);

    const {character} = args;
    let attackSkill = character
      .skillManager
      .getSkillByType(SkillType.NormalAttack)!
      .clone as NormalAttackSkill;

    const history = args.damageCalculator.skillHistory
    let prevSkill: Skill | undefined = history[history.length - 1]?.skill;

    //run A1 if nothing before
    if (!prevSkill || !(prevSkill instanceof NormalAttackSkillStage)) {
      args.damageCalculator.runAnotherSkill(attackSkill, args);
      prevSkill = history[history.length - 1].skill;
    }

    if (prevSkill instanceof AyakaA1) {
      this.frames = 96 - attackSkill.attackStages[0].frames;
    } else if (prevSkill instanceof AyakaA2) {
      this.frames = 115 - attackSkill.attackStages[1].frames;
    } else if (prevSkill instanceof AyakaA3) {
      this.frames = 140 - attackSkill.attackStages[2].frames;
    } else if (prevSkill instanceof AyakaA4) {
      this.frames = 171 - attackSkill.attackStages[3].frames;
    }
  }

  override onEnd(args: SkillArgs): void {
    super.onEnd(args);

    const {character} = args;
    const atk = character.calculatorStats.ATK.calc(this.strategy.type);
    let dmg = this.value.getDamage(this.lvl.current) * atk;

    const hasC6Buff = character.hasEffectByInstance(AyakaC6Buff);

    if (hasC6Buff) {
      dmg = this.C6Value.getDamage(this.lvl.current) * atk;
    }

    const dmgArgs = new SkillDamageArgs({
      ...args,
      value: dmg,
    });

    this.doDamage(dmgArgs);
  }
}
