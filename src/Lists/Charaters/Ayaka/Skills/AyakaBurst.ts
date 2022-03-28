import SkillValue from "@/Skills/SkillValue";
import SummonSkill from "@/Skills/SummonSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import {IDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import ICD from "@/Skills/ICD";
import {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";
import SkillSnapshot from "@/Skills/SkillSnapshot";

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
  public override elementalStatus = new CryoStatus("A1");

  private skillAtkSnapshot: SkillSnapshot = new SkillSnapshot();

  override onStart(args: ISkillBehaviorArgs) {
    this.skillAtkSnapshot.addStat(args.hash + "Atk", args.character.calculatorStats.ATK);
    this.skillAtkSnapshot.addStat(args.hash + "HP", args.character.calculatorStats.HP);
    this.countdown.startCountdown();
  }

  public onAction(args: ICalcDamageArgs): void {
    const {character, behavior} = args;
    const atk = this.skillAtkSnapshot.calcStat(behavior.hash + "Atk", character.calculatorStats.ATK);

    if (this.damageFrames.includes(this.currentFrame)) {
      const dmg = this.durationDmg * atk;
      this.doDamage(args, dmg);
    }
  }

  public override onEnd(args: ISkillBehaviorArgs) {
    const {character} = args;
    const atk = this.skillAtkSnapshot.calcStat(args.hash + "Atk", character.calculatorStats.ATK);
    const dmg = this.usageDmg * atk;
    this.doDamage({character, value: 0, behavior: args}, dmg);
    this.skillAtkSnapshot.remove(args.hash + "Atk");
  }
}
