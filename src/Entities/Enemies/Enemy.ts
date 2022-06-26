import Entity from "@/Entities/Entity";
import EnemyCalculatorStats from "@/Entities/Enemies/EnemyCalculatorStats";

export default class Enemy extends Entity {
  public title: string = "Enemy";

  public calculatorStats: EnemyCalculatorStats = new EnemyCalculatorStats(this);

  private _lvl: number = 1;

  public get lvl(): number {
    return this._lvl;
  }

  private set lvl(lvl: number) {
    this._lvl = lvl;
  }

  public applyLvl(lvl: number): this {
    if (lvl < 1) {
      return this;
    }

    this.lvl = lvl;

    return this;
  }
}
