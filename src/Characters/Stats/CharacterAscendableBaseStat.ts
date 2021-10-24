import CharacterBaseStat from "./CharacterBaseStat";
import AscensionsIterator from "./AscensionsIterator";

export default class CharacterAscendableBaseStat extends CharacterBaseStat {
  constructor(
    private firstLvlValue: number,
    private ascendGain?: number,
  ) {
    super(new AscensionsIterator([]));
  }

  private shouldAdd(lvl: number) {
    return (lvl === 40 || lvl === 50 || lvl === 70 || lvl === 80);
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