import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import XianglingTalent2Buff from "@/Lists/Charaters/Xiangling/Talents/Buffs/XianglingTalent2Buff";
import SkillListenerArgs from "@/Skills/Args/SkillListenerArgs";

export default class XianglingTalent2 extends CharacterTalent {
  private buff = new XianglingTalent2Buff();

  private onElementalSkillEnd(args: SkillListenerArgs) {
    this.buff.activate(this.character);
  }

  private onElementalSkillEndDelegate = this.onElementalSkillEnd.bind(this);

  activate(): void {
    this.character.listeners.ElementalSkillEnded.subscribe(
      this.onElementalSkillEndDelegate
    );
  }

  deactivate(): void {
    this.character.listeners.ElementalSkillEnded.unsubscribe(
      this.onElementalSkillEndDelegate
    );
  }
}
