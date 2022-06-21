import BehaviorUnit from "@/Behavior/BehaviorUnit";
import IBaseArgs from "@/IBaseArgs";

export default class CooldownBehavior extends BehaviorUnit {
  public frames: number;

  constructor(
    private cooldownFrames: number,
    private item?: Function,
  ) {
    super();
    this.frames = cooldownFrames;
  }

  protected override onStart(args: IBaseArgs) {
    this.item?.();
  }

  protected override onEnd(args: IBaseArgs) {
    this.frames = this.cooldownFrames;
  }
}
