import OverridableEffect from "@/Effects/OverridableEffect";
import Enemy from "@/Entities/Enemies/Enemy";
import {StatValue} from "@/CalculatorStats/StatValue";

export default class AyakaC4Debuff extends OverridableEffect<Enemy>{
  public frames: number = 6 * 60;

  private defReductionValue = new StatValue(30);

  protected applyEffect(entity: Enemy): void {
    entity.calculatorStats.defReduction.additionalValues.add(this.defReductionValue);
  }

  protected removeEffect(entity: Enemy): void {
    entity.calculatorStats.defReduction.additionalValues.remove(this.defReductionValue);
  }
}
