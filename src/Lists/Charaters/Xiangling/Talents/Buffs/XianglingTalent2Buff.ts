import OverridableEffect from "@/Effects/OverridableEffect";
import Character from "@/Entities/Characters/Character";
import {StatValue} from "@/CalculatorStats/StatValue";

export default class XianglingTalent2Buff extends OverridableEffect<Character> {
  public frames: number = 10 * 60;

  private pepperAtkBonus = new StatValue(10);

  protected applyEffect(entity: Character): void {
    entity.calculatorStats.ATK.prefixes.add(this.pepperAtkBonus);
  }

  protected removeEffect(entity: Character): void {
    entity.calculatorStats.ATK.prefixes.remove(this.pepperAtkBonus);
  }
}
