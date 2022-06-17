import Listener from "@/Helpers/Listener";
import Effect from "@/Effects/Effect";
import {IAnySKillListenerArgs} from "@/Skills/SkillsListeners";
import DamageCalculator from "@/Roster/DamageCalculator";

export interface IWithOngoingEffects {
  ongoingEffects: Effect<any>[];
  onAnyEffectStarted: Listener<IAnySKillListenerArgs<any>>;
  onAnyEffectEnded: Listener<IAnySKillListenerArgs<any>>;
  damageCalculator: DamageCalculator;
}
