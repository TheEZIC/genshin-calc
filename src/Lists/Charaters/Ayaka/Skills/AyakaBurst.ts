import SkillValue from "@/Skills/SkillValue";
import SummonSkill from "@/Skills/SummonSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";

export default class AyakaBurst extends SummonSkill implements IBurstSkill {
  strategy: BurstSkillStrategy = new BurstSkillStrategy(this);

  countdownFrames: number = 20 * 60; //20 sec

  summonUsageFrames: number = 95;
  summonDurationFrames: number = 5 * 60;

  energyCost: number = 80;
  currentEnergy = this.energyCost;

  targetType: SkillTargetType = SkillTargetType.AOE;
  damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;

  protected summonValue: SkillValue = new SkillValue(168.45, 181.08 - 168.45);
  protected usageValue: SkillValue = new SkillValue(112.3, 120.72 - 112.3);

  protected calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    const dmg =  this.usageMVs * atk + this.durationMVs * atk * 19;
    return dmg;
  }
}
