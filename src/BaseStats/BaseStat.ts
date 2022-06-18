import AscensionsIterator, {AscensionRange} from "./AscensionsIterator";

export default class BaseStat {
  protected ascensions: AscensionsIterator;
  protected currentValue: number;

  constructor(protected ascensionRanges: AscensionRange[]) {
    this.ascensions = new AscensionsIterator(ascensionRanges);
    this.currentValue = this.ascensions.at(0)?.min ?? 0
  }

  protected readonly maxLvl: number = 90;

  /**
   * Get current stat value
   * @return {number} - value
   * */
  public get value(): number {
    return this.currentValue;
  }

  /**
   * Set new stat value
   * @param {number} newValue - new stat value
   * */
  public set value(newValue: number) {
    this.currentValue = newValue;
  }

  /**
   * Get current ascension index by lvl
   * @param {number} lvl - lvl
   * @return {number} ascend number
   * */
  protected getCurrentAscensionIndex(lvl: number): number {
    if (lvl > 0 && lvl <= 20) return 0;
    if (lvl <= 40 ) return 1;
    if (lvl === this.maxLvl) return 6;

    return Math.floor((lvl - 40) / 10 + 2);
  }

  /**
   * Apply lvl to stat
   * @param {number} lvl - apply lvl to stat
   * */
  public applyLvl(lvl: number) {
    if (lvl < 1) return;

    let tempValue = this.ascensions.at(0)?.min ?? 0;

    for (let i = 1; i <= this.maxLvl; i++) {
      const index = this.getCurrentAscensionIndex(i);
      const ascension = this.ascensions.at(index);

      if (!ascension) continue;

      if (ascension.atLvl === i - 1) {
        tempValue += ascension.ascendBonus;
      }

      if (i === lvl) break;

      tempValue += ascension.gain;
    }

    this.currentValue = tempValue;
  }
}
