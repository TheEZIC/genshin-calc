import Character from "@/Entities/Characters/Character";
import Constellation from "@/Constellations/Constellation";
import AyakaC6Buff from "@/Lists/Charaters/Ayaka/Constellation/Buffs/AyakaC6Buff";
import SkillArgs from "@/Skills/Args/SkillArgs";

export default class AyakaC6 extends Constellation {
  private activateBuff(args: SkillArgs) {
    new AyakaC6Buff().activate(args.character);
  }

  private activateBuffDelegate = this.activateBuff.bind(this);

  applyEffect(character: Character): void {
    character.listeners
      .HoldAttackStarted
      .subscribe(this.activateBuffDelegate);
  }

  removeEffect(character: Character): void {
    character.listeners
      .HoldAttackStarted
      .unsubscribe(this.activateBuffDelegate);
  }
}
