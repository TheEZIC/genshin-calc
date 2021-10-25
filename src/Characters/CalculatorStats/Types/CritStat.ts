import PureStat from "./PureStat";

export default abstract class CritStat extends PureStat {
  get critBalance() {
    const critChance = this.calculator.critChance.calc();
    const critDamage = this.calculator.critDamage.calc();

    return critChance / critDamage * 100;
  }

  get critEffect() {
    const critChance = this.calculator.critChance.calc();
    const critDamage = this.calculator.critDamage.calc();

    return 1 + (critChance + critDamage) / 100;
  }
}