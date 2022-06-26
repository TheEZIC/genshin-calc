import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class EnergyRechargeStat extends CharacterPureStat {
  public title: string = "EnergyRecharge";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { energyRecharge } = this.entity.baseStats;
    const artifactsEnergyRecharge = this.getArtifactsValue(
      StatType.EnergyRecharge
    );

    return (
      energyRecharge.value +
      artifactsEnergyRecharge +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { energyRecharge } = this.entity.baseStats;
    const artifactsEnergyRecharge = this.getArtifactsValue(
      StatType.EnergyRecharge
    );

    return (
      energyRecharge.value +
      artifactsEnergyRecharge
    );
  }
}
