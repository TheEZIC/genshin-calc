import SkillValue from "@/Skills/SkillValue";
import SummonSkill from "@/Skills/SummonSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import {IDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";
import DamageCalculator from "@/Roster/DamageCalculator";
import Character from "@/Entities/Characters/Character";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import {ElementalStatusDuration} from "@/ElementalStatuses/ElementalStatusDurartion";
import ICD from "@/Skills/ICD";
import {container} from "@/inversify.config";
import {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";

export default class AyakaBurst extends SummonSkill implements IBurstSkill, IDOTSkill {
  strategy: BurstSkillStrategy = new BurstSkillStrategy(this);
  targetType: SkillTargetType = SkillTargetType.AOE;
  damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;

  energyCost: number = 80;
  energyConsumed: number = 80;

  summonUsageFrames: number = 95;
  summonDurationFrames: number = 5 * 60;
  countdownFrames: number = 20 * 60; //20 sec

  private readonly CUTTINGS_COUNT = 19;

  damageFrames: number[] = this.createRepeatedFrames(
    this.summonDurationFrames / this.CUTTINGS_COUNT,
    this.CUTTINGS_COUNT,
    this.summonUsageFrames,
  );

  protected summonValue: SkillValue = new SkillValue(168.45, 181.08 - 168.45);
  protected usageValue: SkillValue = new SkillValue(112.3, 120.72 - 112.3);

  public override ICD = new ICD(3, 2.5 * 60);
  public override elementalStatus = new CryoStatus(ElementalStatusDuration.A1);

  public calcDamage({character}: ICalcDamageArgs): number {
    const atk = character.calculatorStats.ATK.calc();
    const dmg = this.durationMVs * atk * this.CUTTINGS_COUNT; //cutting dmg

    return dmg;
  }

  public override onEnd({character}: ISkillBehaviorArgs) {
    const damageCalculator: DamageCalculator = container.get("DamageCalculator");
    const atk = character.calculatorStats.ATK.calc();
    damageCalculator.rotationDmg += this.usageMVs * atk; //ayaka burst explode on end
  }
}
