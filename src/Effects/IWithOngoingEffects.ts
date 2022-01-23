import Effect from "@/Effects/Effect";
import Listener from "@/Helpers/Listener";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";

export interface IWithOngoingEffects {
  ongoingEffects: Effect<any>[];
  onAnyEffectStarted: Listener<IAnySKillListenerArgs<any>>;
}
