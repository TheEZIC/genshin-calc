export default class SkillValue {
  constructor(
    private lvl1Value: number,
    private lvl2Value: number,
    private lvl4Value: number,
    private stopEvolveAt?: number,
  ) {}

  private get gain(): number {
    return this.lvl2Value - this.lvl1Value;
  }

  private get ascendGain(): number {
    return this.lvl4Value - this.lvl1Value - this.gain * 3;
  }

  private getGainAtLvl(lvl: number): number {
    if (
      (lvl > 1 && lvl <= 3) ||
      (lvl > 4 && lvl <= 6)
    ) {
      return this.gain;
    } else if (
      lvl === 4 ||
      (lvl > 6 && lvl <= 12)
    ) {
      return this.gain + this.ascendGain;
    } else if (lvl > 12) {
      return this.gain + this.ascendGain * 2;
    } else {
      return 0;
    }
  }

  public getValue(lvl: number): number {
    let value = this.lvl1Value;

    for (let i = 1; i <= lvl; i++) {
      if (this.stopEvolveAt === i) {
        break;
      }

      value += this.getGainAtLvl(i);
    }

    return value;
  }

  public getDamage(lvl: number): number {
    const value = this.getValue(lvl);
    return value / 100;
  }

  public getMVs(lvl: number, frames: number) {
    return this.getValue(lvl) / frames;
  }
}
