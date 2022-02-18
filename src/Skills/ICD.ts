export default class ICD {
  constructor(
    private hits: number,
    private frames: number,
  ) {
  }

  private _onCountdown: boolean = false;

  private currentHits: number = 0;
  private currentFrames: number = 0;

  public get onCountdown(): boolean {
    let onCountdown = this._onCountdown;

    if (!this._onCountdown) {
      this._onCountdown = true;
    }

    return onCountdown;
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
