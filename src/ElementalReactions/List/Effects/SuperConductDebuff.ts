import OverridableEffect from "@/Effects/OverridableEffect";
import Enemy from "@/Entities/Enemies/Enemy";
import {StatValue} from "@/CalculatorStats/StatValue";

export class SuperConductDebuff extends OverridableEffect<Enemy> {
  public frames: number = 12 * 60;

  private value = new StatValue(40);

  protected applyEffect(entity: Enemy): void {
    entity.calculatorStats
      .physicalResistance
      .additionalValues
      .add(this.value);
  }

  protected removeEffect(entity: Enemy): void {
    entity.calculatorStats
      .physicalResistance
      .additionalValues
      .remove(this.value);
  }
}
