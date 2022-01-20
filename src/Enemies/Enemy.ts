import Effect from "@/Effects/Effect";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";

export default abstract class Enemy {
  public ongoingEffects: Effect<Enemy>[] = [];
  public effectManager: EffectManager<Enemy> = new EffectManager<Enemy>([]);
}
