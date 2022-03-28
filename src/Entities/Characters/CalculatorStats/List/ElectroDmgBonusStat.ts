import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class ElectroDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { electroDmgBonus } = this.character.baseStats;
    const artifactsElectroPercent = this.getArtifactsValue(
      StatType.ElectroDmgBonus
    );

    return (
      electroDmgBonus.value +
      artifactsElectroPercent +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { electroDmgBonus } = this.character.baseStats;
    const artifactsElectroPercent = this.getArtifactsValue(
      StatType.ElectroDmgBonus
    );

    return (
      electroDmgBonus.value +
      artifactsElectroPercent
    );
  }
}
