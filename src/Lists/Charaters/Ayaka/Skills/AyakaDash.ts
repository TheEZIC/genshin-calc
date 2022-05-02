import Character from "@/Entities/Characters/Character";
import NormalSkill from "@/Skills/NormalSkill";
import SkillStrategy from "@/Skills/SkillStrategy";
import DashSkillStrategy from "@/Skills/SkillStrategy/DashSkillStrategy";
import {ISkillActionArgs} from "@/Skills/Skill";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import AyakaDashBuff from "@/Lists/Charaters/Ayaka/Skills/Buffs/AyakaDashBuff";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";

export default class AyakaDash extends NormalSkill {
  public skillName: string = "Kamisato Art: Senho";

  public strategy: SkillStrategy = new DashSkillStrategy(this)

  public frames: number = 20;
  public countdownFrames: number = 0;

  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  private dashBuff = new AyakaDashBuff();

  public override subscribeEffects(character: Character): void {
    character.listeners.DashSkillEnded.subscribe(this.dashBuff);
  }

  public override unsubscribeEffects(character: Character): void {
    character.listeners.DashSkillEnded.unsubscribe(this.dashBuff);
  }

  public onAction(args: ISkillActionArgs): void {
    if (this.currentFrame === 1) {
      this.doDamage({
        ...args,
        value: 0,
        elementalStatus: new CryoStatus(1),
      });
    }
  }
}
