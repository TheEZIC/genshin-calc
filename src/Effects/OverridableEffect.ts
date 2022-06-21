import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class OverridableEffect<T extends IWithOngoingEffects> extends Effect<T> {
  public override activate(entity: T): this {
    if (!this.isStarted) {
      super.activate(entity);
    } else {
      this.reactivate(entity);
    }
    return this;
  }
}
