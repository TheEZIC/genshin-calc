import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class PyroDmgBonusStat extends PureStat {
  public title: string = "PyroDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { pyroDmgBonus } = this.character.baseStats;
    const artifactsPyroPercent = this.getArtifactsValue(StatType.PyroDmgBonus);

    return (
      pyroDmgBonus.value +
      artifactsPyroPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { pyroDmgBonus } = this.character.baseStats;
    const artifactsPyroPercent = this.getArtifactsValue(StatType.PyroDmgBonus);

    return (
      pyroDmgBonus.value +
      artifactsPyroPercent
    );
  }
}
