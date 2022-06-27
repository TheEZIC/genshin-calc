import Constellation from "@/Constellations/Constellation";
import Character from "@/Entities/Characters/Character";
import {IOnSkillAction} from "@/Roster/GlobalListeners";
import XianglingC1Debuff from "@/Lists/Charaters/Xiangling/Conellation/Effects/XianglingC1Debuff";

export default class XianglingC1 extends Constellation {
  private debuff = new XianglingC1Debuff();

  private onElementalHit(args: IOnSkillAction) {
    for (let target of args.targets) {
      this.debuff.activate(target);
    }
  }

  private onElementalHitDelegate = this.onElementalHit.bind(this);

  applyEffect(character: Character): void {
    character.listeners.ElementalSkillBeforeDamage.subscribe(
      this.onElementalHitDelegate
    );
  }

  removeEffect(character: Character): void {
    character.listeners.ElementalSkillBeforeDamage.unsubscribe(
      this.onElementalHitDelegate
    );
  }
}
