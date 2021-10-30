import Ascension from "./Ascension";
import AscensionsIterator from "./AscensionsIterator";

export default class BaseStat {
  constructor(
    protected ascensions: AscensionsIterator,
  ) {
  }

  protected readonly maxLvl: number = 90;
  protected currentValue = this.ascensions.at(0)?.min ?? 0;

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
    let ascension: number = 0;

    if (lvl > 0 && lvl <= 20) ascension = 0;
    if (lvl > 20 && lvl <= 40) ascension = 1;
    if (lvl > 40 && lvl <= 50) ascension = 2;
    if (lvl > 50 && lvl <= 60) ascension = 3;
    if (lvl > 60 && lvl <= 70) ascension = 4;
    if (lvl > 70 && lvl <= 80) ascension = 5;
    if (lvl > 80 && lvl <= this.maxLvl) ascension = 6;

    return ascension;
  }

  /**
   * Apply lvl to all character stats
   * @param {number} lvl - apply lvl to stat
   * */
  public applyLvl(lvl: number) {
    if (lvl < 1) return;

    for (let i = 1; i <= this.maxLvl; i++) {
      const index = this.getCurrentAscensionIndex(i);
      const ascension = this.ascensions.at(index);

      if (!ascension) continue;

      this.currentValue += ascension.gain;

      if (ascension.atLvl === i - 1) {
        this.currentValue += ascension.ascendBonus;
      }

      if (i === lvl) break;
    }
  }
}