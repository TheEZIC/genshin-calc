import Character from "@/Entities/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import DashSkillStrategy from "@/Skills/SkillStrategy/DashSkillStrategy";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import AyakaDashBuff from "@/Lists/Charaters/Ayaka/Skills/Buffs/AyakaDashBuff";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import SkillArgs from "@/Skills/Args/SkillArgs";
import SkillDamageArgs from "@/Skills/Args/SkillDamageArgs";

export default class AyakaDash extends NormalSkill {
  public skillName: string = "Kamisato Art: Senho";

  public strategy: SkillStrategy = new DashSkillStrategy(this)

  public frames: number = 20;
  public countdownFrames: number = 0;

  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  private dashBuff = new AyakaDashBuff();

  private activateDashBuff(args: SkillArgs) {
    this.dashBuff.activate(args.character);
  }

  private activateDashBuffDelegate = this.activateDashBuff.bind(this);

  public override subscribeEffects(character: Character): void {
    character.listeners.DashSkillEnded.subscribe(
      this.activateDashBuffDelegate
    );
  }

  public override unsubscribeEffects(character: Character): void {
    character.listeners.DashSkillEnded.unsubscribe(
      this.activateDashBuffDelegate
    );
  }

  public override onStart(args: SkillArgs) {
    super.onStart(args);

    const dmgArgs = new SkillDamageArgs({
      ...args,
      value: 0,
      elementalStatus: new CryoStatus(1),
    });

    this.doDamage(dmgArgs);
  }
}
