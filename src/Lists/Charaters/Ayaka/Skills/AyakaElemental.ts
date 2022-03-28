import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";

export default class AyakaElemental extends NormalSkill {
  public strategy: SkillStrategy = new ElementalSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  public frames: number = 56;
  public countdownFrames: number = 10 * 60; //10 sec

  protected value: SkillValue = new SkillValue(239.2, 257.14 - 239.2);

  public override ICD = new ICD(0, 0);
  public override elementalStatus = new CryoStatus("B2");

  override onStart(args: ISkillBehaviorArgs) {
    this.countdown.startCountdown();
  }

  onAction(args: ICalcDamageArgs): void {
    if (this.currentFrame === 1) {
      const {character} = args;
      const atk = character.calculatorStats.ATK.calc();
      this.doDamage(args, this.dmg * atk);
    }
  }
}
