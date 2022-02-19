import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import Effect from "@/Effects/Effect";
import Listener from "@/Helpers/Listener";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";

export default abstract class Entity<T extends IWithOngoingEffects = IWithOngoingEffects> implements IWithOngoingEffects {
  public ongoingEffects: Effect<T>[] = [];
  public onAnyEffectStarted: Listener<IAnySKillListenerArgs<T>> = new Listener();
  public onAnyEffectEnded: Listener<IAnySKillListenerArgs<T>> = new Listener();
}
