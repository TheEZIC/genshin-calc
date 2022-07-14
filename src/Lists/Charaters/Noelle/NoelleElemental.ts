import Skill from "@/Skills/Skill";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import {ISkillStrategy} from "@/Skills/SkillStrategy";
import ElementalSkillStrategy from "@/Skills/SkillStrategy/ElementalSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillShieldArgs from "@/Skills/Args/SkillShieldArgs";
import NoelleShield from "@/Lists/Charaters/Noelle/Skills/Buffs/NoelleShield";
import SkillValue from "@/Skills/SkillValue";
import SkillDamageArgs from "../../../Skills/Args/SkillDamageArgs";

export default class NoelleElemental extends Skill {
  skillName: string = "";

  strategy: ISkillStrategy = new ElementalSkillStrategy(this);

  frames: number = 0;
  countdownFrames: number = 24 * 60;

  damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;
  targetType: SkillTargetType = SkillTargetType.AOE;

  private shield = new NoelleShield();

  public skillDamage: SkillValue = new SkillValue(120, 129, 150);

  //TODO: add flat
  public absorbtionValue: SkillValue = new SkillValue(160, 172, 200);
  //TODO: add flat
  public healValue: SkillValue = new SkillValue(21.28, 22.88, 26.6);
  public healChangeValue: SkillValue = new SkillValue(50 / 100, 51 / 100, 53 / 100, 11);

  protected override onStart(args: SkillArgs) {
    super.onStart(args);

    const def = args.character.calculatorStats.DEF.calc(this.strategy.type);
    const shieldStrength = this.absorbtionValue.getValue(this.lvl.current) * def;
    const dmg = this.skillDamage.getValue(this.lvl.current) * def;

    this.shield.changeDurability(shieldStrength);

    const shieldArgs = new SkillShieldArgs({
      ...args,
      value: shieldStrength,
      shield: this.shield,
    });

    const dmgArgs = new SkillDamageArgs({
      ...args,
      value: dmg,
    });

    this.createShield(shieldArgs, [args.character]);
    this.doDamage(dmgArgs, "Noelle shield dmg");
  }

  protected override onEnd(args: SkillArgs) {
    super.onEnd(args);
  }
}
