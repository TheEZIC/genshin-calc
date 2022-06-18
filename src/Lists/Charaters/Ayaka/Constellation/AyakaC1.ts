import Character from "@/Entities/Characters/Character";
import Constellation from "@/Constellations/Constellation";
import {SkillType} from "@/Skills/SkillType";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class AyakaC1 extends Constellation {
  private onAttack(event: SkillArgs) {
    const elementalSkill = event.character.skillManager.getSkillByType(SkillType.Elemental);
    elementalSkill?.countdown.reduceCountdown(60 * 0.3);
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
