import AscensionsIterator from "./AscensionsIterator";

export default class Ascension {
  constructor(
    public min: number,
    public max: number,
    private index: number,
    private composite: AscensionsIterator,
  ) {
  }

  /**
   * Get lvls required to ascension
   * @param {number} lvl - lvl
   * @return {boolean} should or not add value
   * */
  private get ascensionLvls() {
    switch (this.index) {
      case 0: return 20;
      case 1: return 20;
      default: return 10;
    }
  }

  /**
   * Get lvl needed for this ascension
   * @return {boolean} should or not add value
   * */
  public get atLvl() {
    switch (this.index) {
      case 0: return 0;
      case 1: return 20;
      case 2: return 40;
      case 3: return 50;
      case 4: return 60;
      case 5: return 70;
      case 6: return 80;
    }
  }

  /**
   * Get stat gain value per ascension
   * @return {boolean} should or not add value
   * */
  public get gain(): number {
    return (this.max - this.min) / this.ascensionLvls;
  }

  /**
   * Get bonus stat value for ascension
   * @return {number} number
   * */
  public get ascendBonus(): number {
    const prev = this.composite.getPrev(this.index);
    if (!prev) return 0;
    return this.min - prev.max;
  }
}