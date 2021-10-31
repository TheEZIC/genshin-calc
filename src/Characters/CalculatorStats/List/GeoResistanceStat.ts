import PureStat from "../Types/PureStat";

export default class GeoResistanceStat extends PureStat {
  calc(): number {
    const {geoResistance} = this.character.baseStats;

    return geoResistance.value + this.additionalValuesSum;
  }
}