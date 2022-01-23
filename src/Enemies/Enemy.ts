import Effect from "@/Effects/Effect";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";
import Listener from "@/Helpers/Listener";
import {IAnySKillListenerArgs, ISkillListenerArgs} from "@/Skills/SkillsListeners";

export default class Enemy {
  public ongoingEffects: Effect<Enemy>[] = [];
  public onAnyEffectStarted: Listener<IAnySKillListenerArgs<Enemy>> = new Listener();
  public effectManager: EffectManager<Enemy> = new EffectManager<Enemy>([]);
}
