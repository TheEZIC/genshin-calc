import {IWithEffects} from "@/Effects/IWithEffects";
import Effect from "@/Effects/Effect";

export default abstract class Enemy implements IWithEffects<Enemy> {
  public effects: Effect<Enemy>[] = [];
  public ongoingEffects: Effect<Enemy>[] = [];

  public abortEffects(character: Enemy): void {
  }

  public initEffects(character: Enemy): void {
  }
}
