import SummonSkill from "@/Skills/SummonSkill";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillValue from "@/Skills/SkillValue";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import NoelleBurstBuff from "@/Lists/Charaters/Noelle/Skills/Buffs/NoelleBurstBuff";

export default class NoelleBurst extends SummonSkill {
  public skillName: string = "Sweeping Time";

  public strategy: ISkillStrategy = new BurstSkillStrategy(this);

  public summonDurationFrames: number = 15 * 60;
  public summonUsageFrames: number = 111;

  public countdownFrames: number = 15 * 60;

  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Snapshot;
  public targetType: SkillTargetType = SkillTargetType.AOE;

  public override skipUsageFrames = false;

  private burstDamageValue = new SkillValue(67.2, 72.24, 84);
  private skillDamageValue = new SkillValue(92.8, 99.76, 116);

  private burstDamageFrames: number = 24;
  private skillDamageFrames: number = 65;

  private burstBuff = new NoelleBurstBuff();

  public override onAction(args: SkillArgs) {
    super.onAction(args);

    if (this.currentFrame === this.summonUsageFrames) {
      this.burstBuff.activate(args.character);
    }

    if (this.frames === this.burstDamageFrames) {
      const atk = args.character.calculatorStats.ATK.calc(this.strategy.type);
      const dmg = atk * this.burstDamageValue.getDamage(this.lvl.current);

      const damageArgs = new SkillDamageArgs({
        ...args,
        value: dmg,
        elementalStatus: new GeoStatus(1),
      });

      this.doDamage(damageArgs);
    }

    if (this.frames === this.skillDamageFrames) {
      const atk = args.character.calculatorStats.ATK.calc(this.strategy.type);
      const dmg = atk * this.skillDamageValue.getDamage(this.lvl.current);

      const damageArgs = new SkillDamageArgs({
        ...args,
        value: dmg,
        elementalStatus: new GeoStatus(1),
      });

      this.doDamage(damageArgs);
    }
  }
}
