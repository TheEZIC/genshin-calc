import Effect from "./Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export interface IWithEffects<T extends IWithOngoingEffects> {
  effects: Effect<T>[];
  initEffects(character: T): void;
  abortEffects(character: T): void;
}
