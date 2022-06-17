import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import AyakaTalent1Buff from "@/Lists/Charaters/Ayaka/Talents/Buffs/AyakaTalent1Buff";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class AyakaTalent1 extends CharacterTalent {
  private activateBuff(args: SkillArgs) {
    new AyakaTalent1Buff().activate(args.character);
  }

  private activateBuffDelegate = this.activateBuff.bind(this);

  activate(): void {
    this.character.listeners
      .ElementalSkillEnded
      .subscribe(this.activateBuffDelegate);
  }

  deactivate(): void {
    this.character.listeners
      .ElementalSkillEnded
      .unsubscribe(this.activateBuffDelegate);
  }
}
