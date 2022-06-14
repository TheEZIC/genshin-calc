import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import AyakaTalent1Buff from "@/Lists/Charaters/Ayaka/Talents/Buffs/AyakaTalent1Buff";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import Character from "@/Entities/Characters/Character";

export default class AyakaTalent1 extends CharacterTalent {
  private activateBuff(args: ISkillListenerArgs<Character>) {
    new AyakaTalent1Buff().activate(args.entity);
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
