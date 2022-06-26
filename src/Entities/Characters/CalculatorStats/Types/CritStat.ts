import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default abstract class CritStat extends CharacterPureStat {
  get critBalance(): number {
    const critChance = this.entity.calculatorStats.critChance.calc();
    const critDamage = this.entity.calculatorStats.critDamage.calc();

    return (critChance / critDamage) * 100;
  }

  get pureCritBalance(): number {
    const critChance = this.entity.calculatorStats.critChance.calcPure();
    const critDamage = this.entity.calculatorStats.critDamage.calcPure();

    return (critChance / critDamage) * 100;
  }

  get critEffect(): number {
    const critChance = this.entity.calculatorStats.critChance.calc();
    const critDamage = this.entity.calculatorStats.critDamage.calc();

    if (critChance < 0 || critDamage < 0) {
      return 1;
    }

    return 1 + (critChance * critDamage) / 10000;
  }

  get pureCritEffect(): number {
    const critChance = this.entity.calculatorStats.critChance.calcPure();
    const critDamage = this.entity.calculatorStats.critDamage.calcPure();

    if (critChance < 0 || critDamage < 0) {
      return 1;
    }

    return 1 + (critChance * critDamage) / 10000;
  }
}
