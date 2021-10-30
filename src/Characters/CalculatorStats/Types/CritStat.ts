import PureStat from "./PureStat";

export default abstract class CritStat extends PureStat {
  /**
   * Crit effect
   * Crit chance / crit damage * 100;
   * @return {number} - crit balance
   * */
  get critBalance(): number {
    const critChance = this.calculator.critChance.calc();
    const critDamage = this.calculator.critDamage.calc();

    return critChance / critDamage * 100;
  }

  /**
   * Crit effect
   * 1 + (critChance + critDamage) / 100
   * @return {number} - crit effect
   * */
  get critEffect(): number {
    const critChance = this.calculator.critChance.calc();
    const critDamage = this.calculator.critDamage.calc();

    return 1 + (critChance + critDamage) / 100;
  }
}