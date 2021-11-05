import Stat from "./Stat";

export default abstract class PureStat extends Stat {
  private additionalValues: number[] = [];

  /**
   * Add additional value
   * (ER, Elem dmg, crits, flat and etc)
   * @param {number} additionalValue - additional value to add
   * @return {PureStat} - this
   * */
  public addAdditionalValue(additionalValue: number): this {
    this.additionalValues.push(additionalValue);
    return this;
  }

  /**
   * Remove additional value
   * (ER, Elem dmg, crits, flat and etc)
   * @param {number} additionalValue - additional value to remove
   * @return {PureStat} - this
   * */
  public removeAdditionalValue(additionalValue: number): this {
    this.additionalValues = this.additionalValues.filter((v) => v !== additionalValue);
    return this;
  }

  /**
   * Sum af additional values
   * (ER, Elem dmg, crits, flat and etc)
   * @return {number} - this
   * */
  get additionalValuesSum(): number {
    return this.additionalValues.reduce((a, b) => a + b, 0);
  }

  /**
   * Remove all additional values
   * @return {PureStat} - this
   * */
  public override clear(): this {
    this.additionalValues = [];
    return this;
  }
}
