import PureStat from "../Types/PureStat";

export default class DendroResistanceStat extends PureStat {
  calc(): number {
    const {dendroResistance} = this.baseStats;

    return dendroResistance.value + this.additionalValuesSum;
  }
}