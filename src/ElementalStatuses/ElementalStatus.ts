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
    const {decay, units} = this.parsedDuration;
    return decay * units;
  }

  public get pureDecay(): string {
    const {decay} = this.parsedDurationString;
    return decay;
  }

  public get parsedDecay(): number {
    const {decay} = this.parsedDurationString;
    return this.parseDecaySymbol(decay);
  }

  public get units(): number {
    const {units} = this.parsedDurationString;
    return units;
  }

  private applyDurationRegexp(regexp: RegExp): {decay: string, units: number} {
    const result = regexp.exec(this.duration.toUpperCase())!!;
    const groups = result.groups!!;
    const decay: string = groups.decay ?? "UNKNOWN";
    const units: number = Number(groups.units);

    return {decay, units};
  }

  private get parsedDurationString(): {decay: string, units: number} {
    const regexps = [
      /(?<decay>\D+)(?<units>\d+)/i,
      /(?<units>\d+)(?<decay>\D+)/i,
      /U(?<units>\d+)/i,
      /(?<units>\d+)U/i,
    ];

    for (let regexp of regexps) {
      if (regexp.test(this.duration)) {
        return this.applyDurationRegexp(regexp);
      }
    }

    return {decay: "UNKNOWN", units: 0};
  }

  private get parsedDuration(): {decay: number, units: number} {
    const {decay, units} = this.parsedDurationString;
    return {decay: this.parseDecaySymbol(decay), units};
  }

  private parseDecaySymbol(speedSymbol: string): number {
    switch (speedSymbol.toUpperCase()) {
      case "A": return 9.5 * 60;
      case "B": return 6 * 60;
      case "C": return 4.25 * 60;
      default: return 0;
    }
  }
}
