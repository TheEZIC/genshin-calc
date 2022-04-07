import AscensionsIterator from "@/BaseStats/AscensionsIterator";
import BaseStat from "@/BaseStats/BaseStat";

export default class CharacterAscendableBaseStat extends BaseStat {
  constructor(private firstLvlValue: number, private ascendGain?: number) {
    super([]);
  }

  /**
   * Should change stat at ascension
   * @param {number} lvl - lvl
   * @return {boolean} should or not add value
   * */
  private shouldAdd(lvl: number): boolean {
    return lvl === 41 || lvl === 51 || lvl === 71 || lvl === 81;
  }

  public override applyLvl(lvl: number) {
    if (lvl < 1 || !this.ascendGain) return;

    for (let i = 1; i <= this.maxLvl; i++) {
      const shouldAdd = this.shouldAdd(i);

      if (shouldAdd) {
        this.currentValue += this.ascendGain;
      }

      if (i === lvl) break;
    }
  }
}
