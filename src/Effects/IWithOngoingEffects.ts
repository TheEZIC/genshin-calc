import Listener from "@/Helpers/Listener";
import Effect from "@/Effects/Effect";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";

export interface IWithOngoingEffects {
  ongoingEffects: Effect<any>[];
  onAnyEffectStarted: Listener<IAnySKillListenerArgs<any>>;
  onAnyEffectEnded: Listener<IAnySKillListenerArgs<any>>;
}
