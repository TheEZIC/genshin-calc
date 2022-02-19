import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import StackableEffect from "@/Effects/StackableEffect";

export default abstract class EffectStack<T extends IWithOngoingEffects> extends Effect<T> {
  constructor(
    protected stackable: StackableEffect<T>
  ) {
    super();
  }

  override activate(entity: T): this {
    this.stackable.addStack(entity, this);
    return super.activate(entity);
  }

  override deactivate(entity: T): this {
    this.stackable.removeStack(entity, this);
    return super.deactivate(entity);
  }
}
