import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class HydroResistanceStat extends PureStat {
  calc(): number {
    const { hydroResistance } = this.character.baseStats;

    return hydroResistance.value + this.additionalValuesSum;
  }
}
