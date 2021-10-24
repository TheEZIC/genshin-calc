import AscensionsIterator from "./AscensionsIterator";

export default class Ascension {
  constructor(
    public min: number,
    public max: number,
    private index: number,
    private composite: AscensionsIterator,
  ) {
  }

  private get ascensionLvls() {
    switch (this.index) {
      case 0: return 20;
      case 1: return 20;
      default: return 10;
    }
  }

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

  public get gain() {
    return (this.max - this.min) / this.ascensionLvls;
  }

  public get ascendBonus() {
    const prev = this.composite.getPrev(this.index);
    if (!prev) return 0;
    return this.min - prev.max;
  }
}