import SummonSkill from "@/Skills/SummonSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {ICalcDamageArgs} from "@/Skills/Skill";
import SkillValue from "@/Skills/SkillValue";
import {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";
import SkillSnapshot from "@/Skills/SkillSnapshot";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";

export default class XianglingBurst extends SummonSkill implements IBurstSkill {
  strategy: BurstSkillStrategy = new BurstSkillStrategy(this);
  targetType: SkillTargetType = SkillTargetType.AOE;
  damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;

  public override skipUsageFrames = false;

  summonUsageFrames: number = 29;
  summonDurationFrames: number = 0;
  countdownFrames: number = 20 * 60; // 12 sec

  energyConsumed: number = 80;
  energyCost: number = 80;

  protected summonValue: SkillValue = new SkillValue(112, 120.4 - 112);
  protected usageValue: SkillValue = new SkillValue(0, 0);

  private currentHit = 0;
  private hitsFrames = [34, 50, 75];
  private hits: SkillValue[] = [
    new SkillValue(72, 77.4 - 72),
    new SkillValue(88, 94.6 - 88),
    new SkillValue(109.6, 117.82 - 109.6),
  ];

  public override elementalStatus = new PyroStatus("A1");

  private skillAtkSnapshot: SkillSnapshot = new SkillSnapshot();
  private pyronadoFrames: number[] = [];

  protected override onAwake(args: ICalcDamageArgs) {
    const currentConst = args.character.constellationsManager.current;
    this.summonDurationFrames = currentConst >= 4 ? 14 * 60 : 10 * 60;

    const pyronadoHits = this.summonDurationFrames / 70;

    this.pyronadoFrames = this.createRepeatedFrames(
      this.summonDurationFrames / pyronadoHits,
      pyronadoHits,
      75,
    );
  }

  override onStart(args: ISkillBehaviorArgs) {
    this.ICD = new ICD(3, 2.5);
  }

  onAction(args: ICalcDamageArgs): void {
    if (this.hitsFrames.includes(this.currentFrame)) {
      const currentHit = this.hits[this.currentHit];
      const atk = args.character.calculatorStats.ATK.calc();
      const dmg = atk * currentHit.getDamage(this.lvl.current);

      this.doDamage(args, dmg, `Pyronado initial hit ${this.currentHit + 1}`);

      if (this.currentHit == 2) {
        this.skillAtkSnapshot.addStat(args.behavior.hash + "Atk", args.character.calculatorStats.ATK);
        this.currentHit = 0;
        this.ICD = null;
      }

      this.currentHit++;
    }

    if (this.currentFrame === this.summonUsageFrames) {
      this.countdown.startCountdown();
    }

    if (this.pyronadoFrames.includes(this.currentFrame)) {
      const atk = this.skillAtkSnapshot.calcStat(args.behavior.hash + "Atk", args.character.calculatorStats.ATK);
      const dmg = atk * this.durationDmg;
      this.doDamage(args, dmg, "Pyronado hit");
    }
  }
}
