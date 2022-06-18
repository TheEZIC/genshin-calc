import Effect from "@/Effects/Effect";
import Character from "@/Entities/Characters/Character";

export default class AyakaC6Buff extends Effect<Character> {
  // It lasts 30 frames, but I add additional 170 frames because
  // game activate buff after hit scan,
  // but I activate buff after skill start
  public frames: number = 170 + 30;
  public override countdownFrames = 10 * 60;

  protected applyEffect(entity: Character): void {}
  protected removeEffect(entity: Character): void {}
}
