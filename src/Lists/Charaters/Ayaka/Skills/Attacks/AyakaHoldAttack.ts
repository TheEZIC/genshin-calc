import NormalSkill from "@/Skills/NormalSkill";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import HoldAttackSkillStrategy from "@/Skills/SkillStrategy/HoldAttackSkillStrategy";
import {SkillType} from "@/Skills/SkillType";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import AyakaC6Buff from "@/Lists/Charaters/Ayaka/Constellation/Buffs/AyakaC6Buff";
import NormalAttackSkill from "@/Skills/NormalAttackSkill";
import AyakaA1 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA3";
import Skill from "@/Skills/Skill";
import NormalAttackSkillStage from "@/Skills/NormalAttackSkillStage";
import AyakaA4 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA4";

export default class AyakaHoldAttack extends NormalSkill implements IMultipleHitSkill {
  public skillName: string = "Kamisato Art: Kabuki";

  public strategy: SkillStrategy = new HoldAttackSkillStrategy(this);
  public frames: number = 0;
  public countdownFrames: number = 0;
  public hits: number = 3;

  private value: SkillValue = new SkillValue(55.13 * this.hits, (59.61 - 55.13) * this.hits);

  private C6Bonus: number = 298;
  private C6Value: SkillValue = new SkillValue((55.13 + this.C6Bonus) * this.hits, (59.61 - 55.13 + this.C6Bonus) * this.hits);

  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  protected override onAwake(args: SkillArgs) {
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
    const {character} = args;
    const atk = character.calculatorStats.ATK.calc();
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
