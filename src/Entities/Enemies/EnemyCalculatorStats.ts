import Enemy from "@/Entities/Enemies/Enemy";
import {DefReductionStat} from "@/Entities/Enemies/CalculatorStats/List/Def/DefReductionStat";
import {DefShredStat} from "@/Entities/Enemies/CalculatorStats/List/Def/DefShredStat";

export default class EnemyCalculatorStats {
  constructor(private enemy: Enemy) {}

  public readonly defReduction = new DefReductionStat(this.enemy);
  public readonly defShred = new DefShredStat(this.enemy);
}
