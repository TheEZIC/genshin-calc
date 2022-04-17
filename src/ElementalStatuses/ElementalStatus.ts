import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";
import ElementalReaction from "@/ElementalReactions/ElementalReaction";

export default abstract class ElementalStatus extends Effect<IWithOngoingEffects> {
  private _units: number;
  private _framesDuration: number;
  private _unitCapacity: number;

  constructor(
    units: number,
  ) {
    super();
    this._units = units;
    this._framesDuration = 150 * units + 420;
    this._unitCapacity = this._framesDuration / this._units;
  }

  protected override applyEffect(entity: IWithOngoingEffects): void {
  }

  protected override removeEffect(entity: IWithOngoingEffects): void {
  }

  public get units(): number {
    return this._units;
  }

  public get remainingDuration() {
    return this._framesDuration - this.currentFrame;
  }

  public get framesDuration(): number {
    return this._framesDuration;
  }

  public react(element: ElementalStatus, reaction: ElementalReaction, ignoreUnits: boolean = false): void {
    const units = !ignoreUnits ? element.units : 1;
    const additionalFrames = reaction.triggerMultiplier * units * this.unitCapacity;
    this.currentFrame += Math.round(additionalFrames);
  }

  public refill(element: ElementalStatus) {
    this.changeFramesDuration(element.units * this.unitCapacity);
  }

  public get unitCapacity(): number {
    return this._unitCapacity;
  }

  public recreate(units: number): this {
    this._units = units;
    this._framesDuration = 150 * units + 420;
    this._unitCapacity = this._framesDuration / this._units;
    this.currentFrame = 0;
    this.isOnCountdown = false;

    return this;
  }

  private changeFramesDuration(framesDuration: number): void {
    this._framesDuration = framesDuration;
  }
}
