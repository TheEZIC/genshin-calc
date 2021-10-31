import PureStat from "../Types/PureStat";

export default class CryoResistanceStat extends PureStat {
  calc(): number {
    const {cryoResistance} = this.character.baseStats;

    return cryoResistance.value + this.additionalValuesSum;
  }
}