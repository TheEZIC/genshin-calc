import PureStat from "./PureStat";

export default abstract class CritStat extends PureStat {
  get critBalance(): number {
    const critChance = this.character.calculatorStats.critChance.calc();
    const critDamage = this.character.calculatorStats.critDamage.calc();

    return (critChance / critDamage) * 100;
  }

  get pureCritBalance(): number {
    const critChance = this.character.calculatorStats.critChance.calcPure();
    const critDamage = this.character.calculatorStats.critDamage.calcPure();

    return (critChance / critDamage) * 100;
  }

  get critEffect(): number {
    const critChance = this.character.calculatorStats.critChance.calc();
    const critDamage = this.character.calculatorStats.critDamage.calc();

    return 1 + (critChance + critDamage) / 100;
  }

  get pureCritEffect(): number {
    const critChance = this.character.calculatorStats.critChance.calcPure();
    const critDamage = this.character.calculatorStats.critDamage.calcPure();

    return 1 + (critChance + critDamage) / 100;
  }
}
