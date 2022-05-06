import {RefreshableClass} from "@/Refresher/RefreshableClass";
import {RefreshableProperty} from "@/Refresher/RefreshableProperty";

@RefreshableClass
export default class ICD {
  constructor(
    private hits: number,
    private frames: number,
  ) {
  }

  @RefreshableProperty()
  private _onCountdown: boolean = false;

  @RefreshableProperty()
  private currentHits: number = 0;

  @RefreshableProperty()
  private currentFrames: number = 0;

  public get onCountdown(): boolean {
    return this._onCountdown;
  }

  public startCountdown() {
    this._onCountdown = true;
  }

  public addHit() {
    if (!this.onCountdown) return;
    this.currentHits++;

    if (this.currentHits === this.hits) {
      this._onCountdown = false;
      this.currentHits = 0;
    }
  }

  public addFrame() {
    if (!this.onCountdown || this.currentFrames !== 0) return;
    this.currentFrames++;

    if (this.currentFrames === this.frames) {
      this._onCountdown = false;
      this.currentFrames = 0;
      this.currentHits = 0;
    }
  }
}
