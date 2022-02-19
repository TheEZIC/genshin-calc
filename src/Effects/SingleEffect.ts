import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class SingleEffect<T extends IWithOngoingEffects> extends Effect<T> {
  private isActive = false;

  public override activate(entity: T): this {
    if (this.isActive) return this;
    this.isActive = true;
    return super.activate(entity);
  }

  public override deactivate(entity: T): this {
    if (!this.isActive) return this;
    this.isActive = false;
    return super.deactivate(entity);
  }
}
