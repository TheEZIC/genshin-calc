import CharacterTalent from "@/Characters/CharacterTalent";
import AyakaTalent1Buff from "@/Characters/List/Ayaka/Talents/Buffs/AyakaTalent1Buff";

export default class AyakaTalent1 extends CharacterTalent{
  private talent1Buff = new AyakaTalent1Buff();

  activate(): void {
    this.character.listeners
      .ElementalSkillStarted
      .subscribe(this.talent1Buff);
  }

  deactivate(): void {
    this.character.listeners
      .ElementalSkillStarted
      .unsubscribe(this.talent1Buff);
  }
}
