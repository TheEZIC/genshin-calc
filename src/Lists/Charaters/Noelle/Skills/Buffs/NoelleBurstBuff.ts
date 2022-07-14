import OverridableEffect from "@/Effects/OverridableEffect";
import Character from "@/Entities/Characters/Character";
import StatSnapshot from "@/Skills/StatSnapshot";

export default class NoelleBurstBuff extends OverridableEffect<Character> {
  public frames: number = 15 * 60;

  private defSnapshot = new StatSnapshot();

  public snapshotDef() {
    //this.defSnapshot.add()
  }

  protected applyEffect(entity: Character): void {
  }

  protected removeEffect(entity: Character): void {
  }
}
