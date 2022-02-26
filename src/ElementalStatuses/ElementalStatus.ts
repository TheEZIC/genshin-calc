import Effect from "@/Effects/Effect";
import {IWithOngoingEffects} from "@/Effects/IWithOngoingEffects";

export default abstract class ElementalStatus extends Effect<IWithOngoingEffects> {
  constructor(
    private duration: string,
  ) {
    super();
  }

  public framesDuration = this.parseDuration(this.duration);

  protected override applyEffect(entity: IWithOngoingEffects): void {
  }

  protected override removeEffect(entity: IWithOngoingEffects): void {
  }

  protected parseDuration(statusDuration: string) {
    const statusRegexp = /(?<speed>\D+)(\?<units>\d+)/gi;

    if (statusRegexp.test(statusDuration)) {
      const groups = statusRegexp.exec(statusDuration)!!.groups!!;
      const speed: string = groups.speed;
      const units: number = Number(groups.units);
      return this.parseSpeedValue(speed) * units;
    } else {
      return 0;
    }
  }

  private parseSpeedValue(speedSymbol: string): number {
    switch (speedSymbol.toUpperCase()) {
      case "A": return 9.5;
      case "B": return 6;
      case "C": return 4.25;
      default: return 0;
    }
  }
}
