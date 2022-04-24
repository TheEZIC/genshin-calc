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
  strategy: SkillStrategy = new DashSkillStrategy(this)

  frames: number = 20;
  countdownFrames: number = 0;

  targetType: SkillTargetType = SkillTargetType.AOE;
  damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

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
