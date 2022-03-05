import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class ElementalStatus extends Effect<IWithOngoingEffects> {
  constructor(
    public duration: string,
  ) {
    super();
  }

  protected override applyEffect(entity: IWithOngoingEffects): void {
  }

  protected override removeEffect(entity: IWithOngoingEffects): void {
  }

  public get framesDuration(): number {
    const {speed, units} = this.parsedDuration;
    return speed * units;
  }

  public get pureSpeed(): string {
    const {speed} = this.parsedDurationString;
    return speed;
  }

  public get parsedSpeed(): number {
    const {speed} = this.parsedDurationString;
    return this.parseSpeedSymbol(speed);
  }

  public get units(): number {
    const {units} = this.parsedDurationString;
    return units;
  }

  private get parsedDurationString(): {speed: string, units: number} {
    const statusRegexp = /(?<speed>\D+)(\?<units>\d+)/gi;

    if (statusRegexp.test(this.duration)) {
      const groups = statusRegexp.exec(this.duration)!!.groups!!;
      const speed: string = groups.speed;
      const units: number = Number(groups.units);

      return {speed, units};
    } else {
      return {speed: "UNKNOWN", units: 0};
    }
  }

  private get parsedDuration(): {speed: number, units: number} {
    const {speed, units} = this.parsedDurationString;
    return {speed: this.parseSpeedSymbol(speed), units};
  }

  private parseSpeedSymbol(speedSymbol: string): number {
    switch (speedSymbol.toUpperCase()) {
      case "A": return 9.5 * 60;
      case "B": return 6 * 60;
      case "C": return 4.2 * 60;
      default: return 0;
    }
  }
}
