import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class OverridableEffect<T extends IWithOngoingEffects> extends Effect<T> {
  public override activate(entity: T): this {
    const exist = this.checkExistence(entity);

    if (exist) {
      entity.ongoingEffects = entity.ongoingEffects.filter(e => e.name !== this.name);
      this.deactivate(entity);
    }

    return super.activate(entity);
  }
}
