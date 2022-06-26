import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class CryoDmgBonusStat extends CharacterPureStat {
  public title: string = "CryoDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { cryoDmgBonus } = this.entity.baseStats;
    const artifactsCryoPercent = this.getArtifactsValue(StatType.CryoDmgBonus);

    return (
      cryoDmgBonus.value +
      artifactsCryoPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { cryoDmgBonus } = this.entity.baseStats;
    const artifactsCryoPercent = this.getArtifactsValue(StatType.CryoDmgBonus);

    return (
      cryoDmgBonus.value +
      artifactsCryoPercent
    );
  }
}
