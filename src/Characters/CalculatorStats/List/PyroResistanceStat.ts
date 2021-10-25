import PureStat from "../Types/PureStat";

export default class PyroResistanceStat extends PureStat {
  calc(): number {
    const {pyroResistance} = this.baseStats;

    return pyroResistance.value + this.additionalValuesSum;
  }
}