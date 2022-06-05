import { StatType } from "@/BaseStats/StatType";
import CritStat from "@/Entities/Characters/CalculatorStats/Types/CritStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class CritChanceStat extends CritStat {
  public title: string = "CritChance";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { critChance } = this.character.baseStats;
    const artifactsCritChance = this.getArtifactsValue(StatType.CritChance);
    const weaponCritChange = this.getWeaponValue(StatType.CritChance);

    return (
      critChance.value +
      artifactsCritChance +
      weaponCritChange +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { critChance } = this.character.baseStats;
    const artifactsCritChance = this.getArtifactsValue(StatType.CritChance);
    const weaponCritChange = this.getWeaponValue(StatType.CritChance);

    return (
      critChance.value +
      artifactsCritChance +
      weaponCritChange
    );
  }
}
