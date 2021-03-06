import SummonSkill from "@/Skills/SummonSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import ICD from "@/Skills/ICD";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import SkillValue from "@/Skills/SkillValue";
import StatSnapshot from "@/Skills/StatSnapshot";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import {StatValue} from "@/CalculatorStats/StatValue";

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

  private pyronadoTickValue: SkillValue = new SkillValue(112, 120.4, 140);
  private pyronadoInitialHitsValues: SkillValue[] = [
    new SkillValue(72, 77.4, 90),
    new SkillValue(88, 94.6, 110),
    new SkillValue(109.6, 117.82, 137),
  ];

  private skillAtkSnapshot: StatSnapshot = new StatSnapshot();
  private pyronadoFrames: number[] = [];

  private C6PyroDmgBonus = new StatValue(15);

  protected override onAwake(args: SkillArgs) {
    super.onAwake(args);

    const currentConst = args.character.constellationsManager.current;
    this.summonDurationFrames = currentConst >= 4 ? 14 * 60 : 10 * 60;

    const pyronadoHits = this.summonDurationFrames / 70;

    this.pyronadoFrames = this.createRepeatedFrames(
      this.summonDurationFrames / pyronadoHits,
      pyronadoHits,
      75,
    );
  }

  override onStart(args: SkillArgs) {
    super.onStart(args);

    const currentConst = args.character.constellationsManager.current;

    if (currentConst >= 6) {
      const {characters} = args.damageCalculator.roster;

      for (let character of characters) {
        character.calculatorStats.pyroDmgBonus.additionalValues.add(
          this.C6PyroDmgBonus
        );
      }
    }

    this.ICD = new ICD(3, 2.5);
    this.currentHit = 0;

    this.addInfusion(args);
  }

  public override onAction(args: SkillArgs): void {
    super.onAction(args);

    if (this.hitsFrames.includes(this.currentFrame)) {
      const currentHit = this.pyronadoInitialHitsValues[this.currentHit];
      const atk = args.character.calculatorStats.ATK.calc(this.strategy.type);
      const dmg = atk * currentHit.getDamage(this.lvl.current);

      if (this.currentHit == 2) {
        this.skillAtkSnapshot.addStat(args.hash + "Atk", args.character.calculatorStats.ATK, this.strategy.type);
        this.currentHit = 0;
        this.ICD = undefined;
      }

      const damageArgs = new SkillDamageArgs({
        ...args,
        value: dmg,
        elementalStatus: new PyroStatus(1),
      });

      this.doDamage(damageArgs, `Pyronado initial hit ${this.currentHit + 1}`);

      this.currentHit++;
    }

    if (this.currentFrame === this.summonUsageFrames) {
      this.cooldown.startCooldown(args);
    }

    if (this.pyronadoFrames.includes(this.currentFrame)) {
      const atk = this.skillAtkSnapshot.calcStat(args.hash + "Atk", args.character.calculatorStats.ATK, this.strategy.type);
      const dmg = atk * this.pyronadoTickValue.getDamage(this.lvl.current);
      const damageArgs = new SkillDamageArgs({
        ...args,
        value: dmg,
        elementalStatus: new PyroStatus(1),
      });

      this.doDamage(damageArgs, "Pyronado hit");
    }
  }

  protected override onEnd(args: SkillArgs) {
    const currentConst = args.character.constellationsManager.current;

    if (currentConst >= 6) {
      const {characters} = args.damageCalculator.roster;

      for (let character of characters) {
        character.calculatorStats.pyroDmgBonus.additionalValues.remove(
          this.C6PyroDmgBonus
        );
      }
    }

    this.skillAtkSnapshot.remove(args.hash);
  }
}
