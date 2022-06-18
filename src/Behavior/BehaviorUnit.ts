import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";
import IBaseArgs from "@/IBaseArgs";

@RefreshableClass
export default abstract class BehaviorUnit<T extends IBaseArgs = IBaseArgs> {
  public abstract frames: number;

  @RefreshableProperty()
  private _isStarted: boolean = false;

  public get isStarted(): boolean {
    return this._isStarted;
  }

  private set isStarted(isStarted: boolean) {
    this._isStarted = isStarted;
  }

  @RefreshableProperty()
  private _currentFrame: number = 0;

  public get currentFrame(): number {
    return this._currentFrame;
  }

  public set currentFrame(currentFrame: number) {
    this._currentFrame = currentFrame;
  }

  public awake(args: T) {
    this.awakeLogic(args);
    this.onAwake(args);
  }

  public start(args: T): void {
    if (this.isStarted) {
      return;
    }

    args.damageCalculator.behaviourManager.add(this);

    this.isStarted = true;

    this.startLogic(args);
    this.onStart(args);
  }

  public update(args: T): void {
    if (this.isStarted) {
      this.currentFrame++;

      if (this.currentFrame === this.frames) {
        this.end(args);
      }
    }

    this.updateLogic(args);
    this.onUpdate(args);
  }

  public action(args: T) {
    this.actionLogic(args);
    this.onAction(args);
  }

  public end(args: T): void {
    if (!this.isStarted) {
      return;
    }

    args.damageCalculator.behaviourManager.remove(this);

    this.currentFrame = 0;
    this.isStarted = false;

    this.onEndLogic(args);
    this.onEnd(args);
  }

  public sleep(args: T): void {
    this.onSleepLogic(args);
    this.onSleep(args);
  }

  public awakeLogic(args: T): void {}
  public startLogic(args: T): void {}
  public updateLogic(args: T): void {}
  public actionLogic(args: T): void {}
  public onEndLogic(args: T): void {}
  public onSleepLogic(args: T): void {}

  public onAwake(args: T): void {}
  public onStart(args: T): void {}
  public onUpdate(args: T): void {}
  public onAction(args: T): void {}
  public onEnd(args: T): void {}
  public onSleep(args: T): void {}
}
