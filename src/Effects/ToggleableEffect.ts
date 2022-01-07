import Effect from "./Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class ToggleableEffect<T extends IWithOngoingEffects> extends Effect<T> {
}
