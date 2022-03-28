import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";

export default class EnergyRechargeStat extends PureStat {
  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { energyRecharge } = this.character.baseStats;
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
    const { energyRecharge } = this.character.baseStats;
    const artifactsEnergyRecharge = this.getArtifactsValue(
      StatType.EnergyRecharge
    );

    return (
      energyRecharge.value +
      artifactsEnergyRecharge
    );
  }
}
