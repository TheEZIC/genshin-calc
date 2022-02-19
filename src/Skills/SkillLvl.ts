import Skill from "@/Skills/Skill";

export default class SkillLvl {
  constructor(
    private skill: Skill,
  ) {
  }

  private _currentLvl = 1;
  private additionalLvls: number[] = [];

  public addAdditional(additionalLvl: number) {
    this.additionalLvls.push(additionalLvl);
  }

  public removeAdditional(additionalLvl: number) {
    this.additionalLvls.filter((l) => l !== additionalLvl);
  }

  private get sumOfAdditionalLvls() {
    return this.additionalLvls.reduce((a, b) => a + b, 0);
  }

  public get current(): number {
    return this._currentLvl + this.sumOfAdditionalLvls;
  }

  public set current(lvl: number) {
    this._currentLvl = lvl;
  }
}
