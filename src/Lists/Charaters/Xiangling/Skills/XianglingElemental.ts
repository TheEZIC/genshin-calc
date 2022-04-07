import SummonSkill from "@/Skills/SummonSkill";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {ICalcDamageArgs} from "@/Skills/Skill";
import SkillValue from "@/Skills/SkillValue";
import {ISkillBehaviorArgs} from "@/Behavior/SkillBehavior";
import SkillSnapshot from "@/Skills/SkillSnapshot";
import {GoubaEntity} from "@/Lists/Charaters/Xiangling/Skills/GoubaEntity";
import {IDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";

export default class XianglingElemental extends SummonSkill implements IDOTSkill {
  strategy: ISkillStrategy = new ElementalSkillStrategy(this);
  targetType: SkillTargetType = SkillTargetType.AOE;
  damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;

  summonUsageFrames: number = 18;
  summonDurationFrames: number = 7 * 60; //7 sec
  countdownFrames: number = 12 * 60; // 12 sec

  private readonly GOUBA_HITS = 4;

  damageFrames: number[] = [
    ...this.createRepeatedFrames(
      this.summonDurationFrames / this.GOUBA_HITS,
      this.GOUBA_HITS,
      this.summonUsageFrames,
    ),
  ];

  protected summonValue: SkillValue = new SkillValue(111.28, 119.63 - 111.28);
  protected usageValue: SkillValue = new SkillValue(0, 0);

  public override elementalStatus = new PyroStatus("A1");

  private skillAtkSnapshot: SkillSnapshot = new SkillSnapshot();

  private gouba = new GoubaEntity();

  override onStart(args: ISkillBehaviorArgs) {
    this.skillAtkSnapshot.addStat(args.hash + "Atk", args.character.calculatorStats.ATK);
    this.countdown.startCountdown();

    this.damageCalculator.addAction({
      delay: this.summonUsageFrames,
      run: () => {
        this.roster.addEntity(this.gouba);
      }
    });
  }

  onAction(args: ICalcDamageArgs): void {
    if (this.damageFrames.includes(this.currentFrame)) {
      const {character, behavior} = args;
      const atk = this.skillAtkSnapshot.calcStat(behavior.hash + "Atk", character.calculatorStats.ATK);
      const dmg = this.durationDmg * atk;

      const pyroA1 = new PyroStatus("A1");
      const gouba = this.roster.getEntity(this.gouba)!!;
      const goubaStatus = gouba.ongoingEffects.find(e => e.name === pyroA1.name);

      if (!goubaStatus) {
        gouba.ongoingEffects.push(pyroA1);
      } else {
        this.elementalReactionManager.tryToOverrideStatus(pyroA1, pyroA1, gouba);
      }

      this.doDamage(args, dmg, "Gouba hit");
    }
  }

  override onEnd(args: ISkillBehaviorArgs) {
    this.roster.removeEntity(this.gouba);
  }
}
