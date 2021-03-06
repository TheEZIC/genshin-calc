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
import {VisionType} from "@/VisionType";

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

  protected goubaValue: SkillValue = new SkillValue(111.28, 119.63, 139.1);

  private skillAtkSnapshot: StatSnapshot = new StatSnapshot();

  private gouba = new GoubaEntity();

  override onStart(args: SkillArgs) {
    super.onStart(args);

    const {roster} = args.damageCalculator;
    this.gouba = new GoubaEntity();
    this.skillAtkSnapshot.addStat(args.hash + "Atk", args.character.calculatorStats.ATK, this.strategy.type);

    args.damageCalculator.addDelayedAction({
      delay: this.summonUsageFrames,
      run: () => {
        roster.addEntity(this.gouba);
      }
    });

    this.addInfusion(args);
    this.cooldown.startCooldown(args);
  }

  public override onAction(args: SkillArgs): void {
    super.onAction(args);

    if (this.damageFrames.includes(this.currentFrame)) {
      const {character, damageCalculator} = args;
      const {roster, reactionsManager} = damageCalculator;
      const atk = this.skillAtkSnapshot.calcStat(args.hash + "Atk", character.calculatorStats.ATK, this.strategy.type);
      const value = this.goubaValue.getDamage(this.lvl.current)
      const dmg = value * atk;

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

      args.damageCalculator.energyManager.addEnergy({
        type: VisionType.Pyro,
        count: 1,
      });
      this.doDamage(damageArgs, "Gouba hit");
    }
  }

  override onEnd(args: SkillArgs) {
    super.onEnd(args);

    const {roster} = args.damageCalculator;
    roster.removeEntity(this.gouba);
    this.skillAtkSnapshot.remove(args.hash + "Atk");
  }
}
