import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class PhysicalResistanceStat extends PureStat {
  calc(): number {
    const { physicalResistance } = this.character.baseStats;

    return physicalResistance.value + this.additionalValuesSum;
  }
}
