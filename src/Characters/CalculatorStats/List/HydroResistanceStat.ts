import PureStat from "../Types/PureStat";

export default class HydroResistanceStat extends PureStat {
  calc(): number {
    const {hydroResistance} = this.baseStats;

    return hydroResistance.value + this.additionalValuesSum;
  }
}