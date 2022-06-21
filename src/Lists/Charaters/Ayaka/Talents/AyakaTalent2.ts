import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import AyakaTalent2Buff from "@/Lists/Charaters/Ayaka/Talents/Buffs/AyakaTalent2Buff";
import {ISkillListenerArgs} from "@/Skills/SkillsListeners";
import Character from "@/Entities/Characters/Character";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class AyakaTalent2 extends CharacterTalent {
  private buff = new AyakaTalent2Buff();

  private activateBuff(args: SkillArgs) {
    this.buff.activate(args.character);
  }

  private activateBuffDelegate = this.activateBuff.bind(this);

  activate(): void {
    this.character.listeners.DashSkillEnded.subscribe(this.activateBuffDelegate);
  }

  deactivate(): void {
    this.character.listeners.DashSkillEnded.unsubscribe(this.activateBuffDelegate);
  }
}
