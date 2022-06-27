import Character from "@/Entities/Characters/Character";
import Constellation from "@/Constellations/Constellation";
import AyakaC4Debuff from "@/Lists/Charaters/Ayaka/Constellation/Effects/AyakaC4Debuff";
import {IOnSkillDamage} from "@/Roster/GlobalListeners";

export default class AyakaC4 extends Constellation {
  private debuff = new AyakaC4Debuff();

  private onBurstHit(args: IOnSkillDamage) {
    const {targets} = args;

    for (let target of targets) {
      this.debuff.activate(target);
    }
  }

  private onBurstHitDelegate = this.onBurstHit.bind(this);

  applyEffect(character: Character): void {
    character.listeners.BurstSkillBeforeDamage.subscribe(
      this.onBurstHitDelegate
    );
  }

  removeEffect(character: Character): void {
    character.listeners.BurstSkillBeforeDamage.unsubscribe(
      this.onBurstHitDelegate
    );
  }
}
