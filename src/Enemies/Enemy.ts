import {IWithEffects} from "@/Effects/IWithEffects";
import Effect from "@/Effects/Effect";
import EffectManager from "@/Effects/EffectManager";

export default abstract class Enemy implements IWithEffects<Enemy> {
  public effects: Effect<Enemy>[] = [];
  public ongoingEffects: Effect<Enemy>[] = [];

  public effectManager: EffectManager<Enemy> = new EffectManager<Enemy>(this);

  public abortEffects(character: Enemy): void {
  }

  public initEffects(character: Enemy): void {
  }
}
