import PureStat from "../Types/PureStat";

export default class GeoResistanceStat extends PureStat {
  calc(): number {
    const {geoResistance} = this.baseStats;

    return geoResistance.value + this.additionalValuesSum;
  }
}