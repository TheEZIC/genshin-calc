import Stat from "./Stat";

export default abstract class PureStat extends Stat {
  private additionalValues: number[] = [];

  public addAdditionalValue(additionalValue: number): this {
    this.additionalValues.push(additionalValue);
    return this;
  };

  public removeAdditionalValue(additionalValue: number) {
    this.additionalValues = this.additionalValues.filter(v => v !== additionalValue);
  }

  public override clear(): this {
    this.additionalValues = [];
    return this;
  }

  get additionalValuesSum() {
    return this.additionalValues.reduce((a, b) => a + b, 0);
  }
}