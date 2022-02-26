import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import Entity from "@/Entities/Entity";

export default class Enemy extends Entity {
  public effectManager: EffectManager<Enemy> = new EffectManager<Enemy>([]);
}
