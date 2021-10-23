import Ascension from "./Ascension";
import AscensionsComposite from "./AscensionsComposite";

export default class CharacterBaseStat {
  constructor(
    protected firstLvlValue: number,
    protected ascensions: AscensionsComposite,
  ) {
  }

  protected readonly maxLvl: number = 90;
  protected currentValue = this.firstLvlValue;

  public get value(): number {
    return this.currentValue;
  }

  public set value(newValue: number) {
    this.currentValue = newValue;
  }

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

  public applyLvl(lvl: number) {
    if (lvl < 1) return;

    for (let i = 1; i <= this.maxLvl; i++) {
      const index = this.getCurrentAscensionIndex(i);
      const ascension = this.ascensions.at(index);

      this.currentValue += ascension.gain;

      if (ascension.atLvl === i - 1) {
        this.currentValue += ascension.ascendBonus;
      }

      if (i === lvl) break;
    }
  }

  public static isInstanceOf(item: any) {
    return Boolean(item.ascensions)
  }
}