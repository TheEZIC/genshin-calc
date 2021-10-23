import CharacterBaseStat from "./CharacterBaseStat";
import AscensionsComposite from "./AscensionsComposite";

export default class CharacterAscendableBaseStat extends CharacterBaseStat {
  constructor(
    private firstLvlValue: number,
    private ascendGain?: number,
  ) {
    super(new AscensionsComposite([]));
  }

  private shouldAdd(lvl: number) {
    return (lvl === 40 || lvl === 50 || lvl === 70 || lvl === 80);
  }

  public applyLvl(lvl: number) {
    if (lvl < 1) return;

    for (let i = 1; i <= this.maxLvl; i++) {
      const multiplier = this.shouldAdd(i);
      console.log(i, multiplier, this.ascendGain)

      if (multiplier && this.ascendGain) {
        this.currentValue += this.ascendGain;
      }

      if (i === lvl) break;
    }
  }
}