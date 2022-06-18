import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";

export default class AyakaElemental extends NormalSkill {
  public skillName: string = "Kamisato Art: Hyouka";

  public strategy: SkillStrategy = new ElementalSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  public frames: number = 56;
  public countdownFrames: number = 10 * 60; //10 sec

  private skillValue: SkillValue = new SkillValue(239.2, 257.14, 299);

  public override ICD = new ICD(0, 0);

  override onStart(args: SkillArgs) {
    this.addInfusion(args);
    this.countdown.startCountdown(args);
  }

  override onEnd(args: SkillArgs) {
    const {character} = args;
    const atk = character.calculatorStats.ATK.calc();
    const dmg = this.skillValue.getDamage(this.lvl.current) * atk;
    const status = new CryoStatus(2);
    const dmgArgs = new SkillDamageArgs({
      ...args,
      value: dmg,
      elementalStatus: status,
    });

    this.doDamage(dmgArgs, "Ayaka elemental hit");
  }
}
