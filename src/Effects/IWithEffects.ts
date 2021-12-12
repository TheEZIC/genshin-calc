import Effect from "./Effect";
import Character from "@/Characters/Character";

export interface IWithEffects {
  effects: Effect[]
  initEffects(character: Character): void;
  abortEffects(character: Character): void;
}
