import Character from "@/Entities/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {ElementalStatusDuration} from "@/ElementalStatuses/ElementalStatusDurartion";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";

export default class AyakaElemental extends NormalSkill {
  public strategy: SkillStrategy = new ElementalSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  public frames: number = 56;
  public countdownFrames: number = 10 * 60; //10 sec

  protected value: SkillValue = new SkillValue(239.2, 257.14 - 239.2);

  public override ICD = new ICD(0, 0);
  public override elementalStatus = new CryoStatus(ElementalStatusDuration.B2);

  calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    return this.MVs * atk;
  }
}
