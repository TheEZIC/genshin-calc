import Constellation from "@/Constellations/Constellation";
import Character from "@/Entities/Characters/Character";
import {IOnSkillAction} from "@/Roster/GlobalListeners";
import XianglingC1Debuff from "@/Lists/Charaters/Xiangling/Conellation/Effects/XianglingC1Debuff";
import {ICombatDamageArgs} from "@/Skills/CombatActions";
import Enemy from "@/Entities/Enemies/Enemy";

export default class XianglingC1 extends Constellation {
  private debuff = new XianglingC1Debuff();

  private onElementalHit(args: ICombatDamageArgs) {
    if (args.target instanceof Enemy) {
      this.debuff.activate(args.target);
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
