import { StatType } from "@/BaseStats/StatType";
import CritStat from "@/Entities/Characters/CalculatorStats/Types/CritStat";
import { SkillType } from "@/Skills/SkillType";

export default class CritChanceStat extends CritStat {
  calc(skillFilter?: SkillType): number {
    const { critChance } = this.character.baseStats;
    const artifactsCritChance = this.getArtifactsValue(StatType.CritChance);
    const weaponCritChange = this.getWeaponValue(StatType.CritChance);

    return (
      critChance.value +
      artifactsCritChance +
      weaponCritChange +
      this.additionalValues.getSum(skillFilter)
    );
  }
}
