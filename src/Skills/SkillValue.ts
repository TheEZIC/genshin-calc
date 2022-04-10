export default class SkillValue {
  constructor(private baseValue: number, private gain: number) {}

  public getValue(lvl: number): number {
    return this.baseValue + this.gain * (lvl - 1);
  }

  public getDamage(lvl: number): number {
    return this.getValue(lvl) / 100;
  }

  public getMVs(lvl: number, frames: number) {
    return this.getValue(lvl) / frames;
  }
}
