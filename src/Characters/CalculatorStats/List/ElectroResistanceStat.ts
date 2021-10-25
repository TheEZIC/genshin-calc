import PureStat from "../Types/PureStat";

export default class ElectroResistanceStat extends PureStat {
  calc(): number {
    const {electroResistance} = this.baseStats;

    return electroResistance.value + this.additionalValuesSum;
  }
}