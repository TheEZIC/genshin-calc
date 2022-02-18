import OverridableEffect from "@/Effects/OverridableEffect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import {ElementalStatusDuration} from "@/ElementalStatuses/ElementalStatusDurartion";

export default abstract class ElementalStatus extends OverridableEffect<IWithOngoingEffects> {
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
