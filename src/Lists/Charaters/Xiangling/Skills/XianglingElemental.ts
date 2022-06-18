import SummonSkill from "@/Skills/SummonSkill";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import SkillValue from "@/Skills/SkillValue";
import StatSnapshot from "@/Skills/StatSnapshot";
import {GoubaEntity} from "@/Lists/Charaters/Xiangling/Skills/GoubaEntity";
import {IDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";

export default class XianglingElemental extends SummonSkill implements IDOTSkill {
  public skillName: string = "Gouba Attack";

  public strategy: ISkillStrategy = new ElementalSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;

  public summonUsageFrames: number = 18;
  public summonDurationFrames: number = 7 * 60; //7 sec
  public countdownFrames: number = 12 * 60; // 12 sec

  private readonly GOUBA_HITS = 4;

  public damageFrames: number[] = [
    ...this.createRepeatedFrames(
      this.summonDurationFrames / this.GOUBA_HITS,
      this.GOUBA_HITS,
      this.summonUsageFrames,
    ),
  ];

  protected goubaValue: SkillValue = new SkillValue(111.28, 119.63 - 111.28);

  private skillAtkSnapshot: StatSnapshot = new StatSnapshot();

  private gouba = new GoubaEntity();

  override onStart(args: SkillArgs) {
    const {roster} = args.damageCalculator;
    this.gouba = new GoubaEntity();
    this.skillAtkSnapshot.addStat(args.hash + "Atk", args.character.calculatorStats.ATK);
    this.countdown.startCountdown(args);

    args.damageCalculator.addDelayedAction({
      delay: this.summonUsageFrames,
      run: () => {
        roster.addEntity(this.gouba);
      }
    });

    this.addInfusion(args);
    this.countdown.startCountdown(args);
  }

  public override onAction(args: SkillArgs): void {
    if (this.damageFrames.includes(this.currentFrame)) {
      const {roster, reactionsManager} = args.damageCalculator;
      const {character} = args;
      const atk = this.skillAtkSnapshot.calcStat(args.hash + "Atk", character.calculatorStats.ATK);
      const dmg = this.goubaValue.getDamage(this.lvl.current) * atk;

      const pyroA1 = new PyroStatus(1);
      const gouba = roster.getEntity(this.gouba)!!;
      const goubaStatus = gouba.ongoingEffects.find(e => e.name === pyroA1.name);

      if (!goubaStatus) {
        gouba.ongoingEffects.push(pyroA1);
      } else {
        reactionsManager.tryToOverrideStatus(pyroA1, pyroA1, gouba);
      }

      const damageArgs = new SkillDamageArgs({
        ...args,
        value: dmg,
        elementalStatus: pyroA1,
      });

      this.doDamage(damageArgs, "Gouba hit");
    }
  }

  override onEnd(args: SkillArgs) {
    const {roster} = args.damageCalculator;
    roster.removeEntity(this.gouba);
  }
}
