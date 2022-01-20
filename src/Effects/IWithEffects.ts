import Effect from "./Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import EffectManager from "@/Effects/EffectsManagers/EffectManager";

export interface IWithInitializedEffects<T extends IWithOngoingEffects> {
  effectManager: EffectManager<T>;
  effectsToInitialize: Effect<T>[];
  subscribeEffects(character: T): void;
  unsubscribeEffects(character: T): void;
}

export function isIWithInitializedEffects(obj: any): Boolean {
  return obj["effectManager"] && obj["effectsToInitialize"]
}
