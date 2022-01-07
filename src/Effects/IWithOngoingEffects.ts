import Effect from "@/Effects/Effect";

export interface IWithOngoingEffects {
  ongoingEffects: Effect<any>[];
}
