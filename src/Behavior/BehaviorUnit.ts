import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";
import IBaseArgs from "@/IBaseArgs";

@RefreshableClass
export default abstract class BehaviorUnit<T extends IBaseArgs = IBaseArgs> {
  public abstract frames: number;

  private get getFrames() {
    return this.frames;
  }

  private initialFrames: number = this.getFrames;

  public increaseDuration(frames: number) {
    this.frames += frames;
  }

  public decreaseDuration(frames: number) {
    this.frames -= frames;
  }

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

  public get remainingFrames(): number {
    return this.isStarted
      ? this.frames - this.currentFrame
      : 0;
  }

  public awake(args: T) {
    if (!this.shouldAwake(args)) {
      return;
    }

    this.onAwake(args);
  }

  public start(args: T): void {
    if (!this.shouldStart(args)) {
      return;
    }

    args.damageCalculator.behaviourManager.add(this, args);

    this.isStarted = true;

    this.onStart(args);
  }

  public update(args: T): void {
    if (!this.shouldUpdate(args)) {
      return;
    }

    if (this.isStarted) {
      this.currentFrame++;
      this.action(args);

      if (this.currentFrame === this.frames) {
        this.end(args);
      }
    }

    this.onUpdate(args);
  }

  public action(args: T): void {
    if (!this.shouldAction(args)) {
      return;
    }

    this.onAction(args);
  }

  public end(args: T): void {
    if (!this.shouldEnd(args)) {
      return;
    }

    args.damageCalculator.behaviourManager.remove(this);

    this.currentFrame = 0;
    //this.frames = this.initialFrames;
    this.isStarted = false;

    this.onEnd(args);
  }

  public sleep(args: T): void {
    if (!this.shouldSleep(args)) {
      return;
    }

    this.onSleep(args);
  }

  protected shouldAwake(args: T): boolean {
    return true;
  }

  protected shouldStart(args: T): boolean {
    return !this.isStarted;
  }

  protected shouldUpdate(args: T): boolean {
    return true;
  }

  protected shouldAction(args: T): boolean {
    return true;
  }

  protected shouldEnd(args: T): boolean {
   return this.isStarted;
  }

  protected shouldSleep(args: T): boolean {
    return true;
  }

  protected onAwake(args: T): void {}
  protected onStart(args: T): void {}
  protected onUpdate(args: T): void {}
  protected onAction(args: T): void {}
  protected onEnd(args: T): void {}
  protected onSleep(args: T): void {}
}
