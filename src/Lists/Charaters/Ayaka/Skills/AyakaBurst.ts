import SkillValue from "@/Skills/SkillValue";
import SummonSkill from "@/Skills/SummonSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import {IDOTSkill} from "@/Skills/SkillInterfaces/IDOTSkill";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import ICD from "@/Skills/ICD";
import StatSnapshot from "@/Skills/StatSnapshot";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class AyakaBurst extends SummonSkill implements IBurstSkill, IDOTSkill {
  public skillName: string = "Kamisato Art: Soumetsu";

  public strategy: BurstSkillStrategy = new BurstSkillStrategy(this);
  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;

  public energyCost: number = 80;
  public energyConsumed: number = 80;

  public summonUsageFrames: number = 95;
  public summonDurationFrames: number = 5 * 60;
  public countdownFrames: number = 20 * 60; //20 sec

  private readonly CUTTINGS_COUNT = 19;

  damageFrames: number[] = [
    ...this.createRepeatedFrames(
      this.summonDurationFrames / this.CUTTINGS_COUNT,
      this.CUTTINGS_COUNT,
      this.summonUsageFrames,
    ),
    395, //burst bloom frame
  ];

  private cuttingValue: SkillValue = new SkillValue(112.3, 120.72, 140.38);
  private sakuraBloomValue: SkillValue = new SkillValue(168.45, 181.08, 210.56);

  public override ICD = new ICD(3, 2.5 * 60);

  private skillAtkSnapshot: StatSnapshot = new StatSnapshot();

  protected override onStart(args: SkillArgs) {
    super.onStart(args);

    this.skillAtkSnapshot.addStat(args.hash + "Atk", args.character.calculatorStats.ATK, this.strategy.type);
    this.addInfusion(args);
    this.cooldown.startCooldown(args);
  }

  public override onAction(args: SkillArgs): void {
    super.onAction(args);

    if (this.damageFrames.includes(this.currentFrame)) {
      const {character} = args;
      const atk = this.skillAtkSnapshot.calcStat(args.hash + "Atk", character.calculatorStats.ATK, this.strategy.type);
      let dmg = this.cuttingValue.getDamage(this.lvl.current) * atk;

      const constellation = character.constellationsManager.current;
      const isC2 = constellation === 2;

      if (isC2) {
        dmg += dmg * 0.2 * 2;
      }

      const dmgArgs = new SkillDamageArgs({
        ...args,
        value: dmg,
        hits: isC2 ? 3 : 1,
        elementalStatus: new CryoStatus(1),
      });

      this.doDamage(dmgArgs, "Ayaka burst cutting hit");
    }
  }

  public override onEnd(args: SkillArgs) {
    super.onEnd(args);

    const {character} = args;
    const atk = this.skillAtkSnapshot.calcStat(args.hash + "Atk", character.calculatorStats.ATK);
    let dmg = this.sakuraBloomValue.getDamage(this.lvl.current) * atk;

    const constellation = character.constellationsManager.current;
    const isC2 = constellation === 2;

    if (isC2) {
      dmg += dmg * 0.2 * 2;
    }

    const dmgArgs = new SkillDamageArgs({
      ...args,
      value: dmg,
      hits: isC2 ? 3 : 1,
      elementalStatus: new CryoStatus(1),
    });

    this.doDamage(dmgArgs, "Ayaka burst sakura bloom hit");
    this.skillAtkSnapshot.remove(args.hash);
  }
}
