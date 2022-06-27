import Effect from "@/Effects/Effect";
import Enemy from "@/Entities/Enemies/Enemy";
import {StatValue} from "@/CalculatorStats/StatValue";

export default class XianglingC1Debuff extends Effect<Enemy> {
  public frames: number = 6 * 60;

  private pyroRestanceReduction = new StatValue(-15);

  protected applyEffect(entity: Enemy): void {
    entity.calculatorStats.pyroResistance.additionalValues.add(
      this.pyroRestanceReduction
    );
  }

  protected removeEffect(entity: Enemy): void {
    entity.calculatorStats.pyroResistance.additionalValues.remove(
      this.pyroRestanceReduction
    );
  }
}
