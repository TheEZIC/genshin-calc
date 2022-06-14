import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import AyakaTalent2Buff from "@/Lists/Charaters/Ayaka/Talents/Buffs/AyakaTalent2Buff";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import Character from "@/Entities/Characters/Character";

export default class AyakaTalent2 extends CharacterTalent {
  private activateBuff(args: ISkillListenerArgs<Character>) {
    new AyakaTalent2Buff().activate(args.entity);
  }

  private activateBuffDelegate = this.activateBuff.bind(this);

  activate(): void {
    this.character.listeners.DashSkillEnded.subscribe(this.activateBuffDelegate);
  }

  deactivate(): void {
    this.character.listeners.DashSkillEnded.unsubscribe(this.activateBuffDelegate);
  }
}
