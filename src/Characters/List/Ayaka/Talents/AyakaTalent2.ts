import CharacterTalent from "@/Characters/CharacterTalent";
import AyakaTalent2Buff from "@/Characters/List/Ayaka/Talents/Buffs/AyakaTalent2Buff";

export default class AyakaTalent2 extends CharacterTalent{
  private talent2Buff = new AyakaTalent2Buff();

  activate(): void {
    this.character.listeners.DashSkillEnded.subscribe(this.talent2Buff);
  }

  deactivate(): void {
    this.character.listeners.DashSkillEnded.unsubscribe(this.talent2Buff);
  }
}
