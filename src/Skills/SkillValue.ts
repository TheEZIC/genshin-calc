export default class SkillValue {
  constructor(private baseValue: number, private gain: number) {}

  public getValueAtLvl(lvl: number): number {
    return this.baseValue + this.gain * (lvl - 1);
  }
}
