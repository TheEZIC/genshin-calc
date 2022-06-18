import Entity from "@/Entities/Entity";

export default class Enemy extends Entity {
  public title: string = "Enemy"

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
