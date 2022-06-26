import Character from "@/Entities/Characters/Character";
import Constellation from "@/Constellations/Constellation";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";
import CooldownItem from "@/Cooldown/CooldownItem";
import {VisionType} from "@/VisionType";

export default class AyakaC1 extends Constellation {
  private effectCooldown = new CooldownItem(60 * 0.1);

  private onAttack(event: SkillArgs) {
    const infusion = event.skill.infusion.active;

    if (!this.effectCooldown.isOnCooldown && infusion && infusion === VisionType.Cryo) {
      const elementalSkill = event.character.skillManager.getSkillByType(SkillType.Elemental);
      elementalSkill?.cooldown.reduceCountdown(60 * 0.3);
      this.effectCooldown.startCooldown(event);
    }
  }

  private onAttackDelegate = this.onAttack.bind(this);

  public applyEffect(character: Character): void {
    character.listeners.NormalAttackStarted.subscribe(this.onAttackDelegate);
    character.listeners.HoldAttackStarted.subscribe(this.onAttackDelegate);
  }

  public removeEffect(character: Character): void {
    character.listeners.NormalAttackStarted.unsubscribe(this.onAttackDelegate);
    character.listeners.HoldAttackEnded.unsubscribe(this.onAttackDelegate);
  }
}
