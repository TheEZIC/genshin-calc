import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";
import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";

export default class ElectroDmgBonusStat extends CharacterPureStat {
  public title: string = "ElectroDmgBonus";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { electroDmgBonus } = this.entity.baseStats;
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
    const { electroDmgBonus } = this.entity.baseStats;
    const artifactsElectroPercent = this.getArtifactsValue(
      StatType.ElectroDmgBonus
    );

    return (
      electroDmgBonus.value +
      artifactsElectroPercent
    );
  }
}
