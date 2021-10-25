import PureStat from "../Types/PureStat";

export default class PhysicalResistanceStat extends PureStat {
  calc(): number {
    const {physicalResistance} = this.baseStats;

    return physicalResistance.value + this.additionalValuesSum;
  }
}