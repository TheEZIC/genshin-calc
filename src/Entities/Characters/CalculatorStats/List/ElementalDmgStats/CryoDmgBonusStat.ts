import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class CryoDmgBonusStat extends PureStat {
  public title: string = "CryoDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { cryoDmgBonus } = this.character.baseStats;
    const artifactsCryoPercent = this.getArtifactsValue(StatType.CryoDmgBonus);

    return (
      cryoDmgBonus.value +
      artifactsCryoPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { cryoDmgBonus } = this.character.baseStats;
    const artifactsCryoPercent = this.getArtifactsValue(StatType.CryoDmgBonus);

    return (
      cryoDmgBonus.value +
      artifactsCryoPercent
    );
  }
}
