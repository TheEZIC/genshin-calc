import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {ElementalStatusDuration} from "@/ElementalStatuses/ElementalStatusDurartion";

export default abstract class ElementalStatus extends Effect<IWithOngoingEffects> {
  constructor(
    protected duration: ElementalStatusDuration,
  ) {
    super();
  }

  public framesDuration = this.duration;

  protected override applyEffect(entity: IWithOngoingEffects): void {
  }

  protected override removeEffect(entity: IWithOngoingEffects): void {
  }
}
