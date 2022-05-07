import SummonSkill from "@/Skills/SummonSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {ISkillActionArgs} from "@/Skills/Skill";
import SkillValue from "@/Skills/SkillValue";
import {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";
import StatSnapshot from "@/Skills/StatSnapshot";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";

@RefreshableClass
export default class XianglingBurst extends SummonSkill implements IBurstSkill {
  public skillName: string = "Pyronado";

  public strategy: BurstSkillStrategy = new BurstSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;

  public override skipUsageFrames = false;

  public summonUsageFrames: number = 29;
  public summonDurationFrames: number = 0;
  public countdownFrames: number = 20 * 60; // 12 sec

  public energyConsumed: number = 80;
  public energyCost: number = 80;
  private currentHit = 0;

  private hitsFrames = [34, 50, 75];

  private pyronadoTickValue: SkillValue = new SkillValue(112, 120.4 - 112);
  private pyronadoInitialHitsValues: SkillValue[] = [
    new SkillValue(72, 77.4 - 72),
    new SkillValue(88, 94.6 - 88),
    new SkillValue(109.6, 117.82 - 109.6),
  ];

  private skillAtkSnapshot: StatSnapshot = new StatSnapshot();
  private pyronadoFrames: number[] = [];

  protected override onAwake(args: ISkillActionArgs) {
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
    this.currentHit = 0;
  }

  onAction(args: ISkillActionArgs): void {
    if (this.hitsFrames.includes(this.currentFrame)) {
      const currentHit = this.pyronadoInitialHitsValues[this.currentHit];
      const atk = args.character.calculatorStats.ATK.calc();
      const dmg = atk * currentHit.getDamage(this.lvl.current);

      if (this.currentHit == 2) {
        this.skillAtkSnapshot.addStat(args.behavior.hash + "Atk", args.character.calculatorStats.ATK);
        this.currentHit = 0;
        this.ICD = null;
      }

      this.doDamage({
        ...args,
        value: dmg,
        elementalStatus: new PyroStatus(1),
      }, `Pyronado initial hit ${this.currentHit + 1}`);

      this.currentHit++;
    }

    if (this.currentFrame === this.summonUsageFrames) {
      this.countdown.startCountdown();
    }

    if (this.pyronadoFrames.includes(this.currentFrame)) {
      const atk = this.skillAtkSnapshot.calcStat(args.behavior.hash + "Atk", args.character.calculatorStats.ATK);
      const dmg = atk * this.pyronadoTickValue.getDamage(this.lvl.current);
      this.doDamage({
        ...args,
        value: dmg,
        elementalStatus: new PyroStatus(1),
      }, "Pyronado hit");
    }
  }
}
