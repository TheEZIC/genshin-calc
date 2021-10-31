import PureStat from "../Types/PureStat";

export default class AnemoResistanceStat extends PureStat {
  calc(): number {
    const {anemoResistance} = this.character.baseStats;

    return anemoResistance.value + this.additionalValuesSum;
  }
}