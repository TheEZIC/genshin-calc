import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class ElectroDmgBonusStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { electroDmgBonus } = this.character.baseStats;
    const artifactsElectroPercent = this.getArtifactsValue(
      StatType.ElectroDmgBonus
    );

    return (
      electroDmgBonus.value +
      artifactsElectroPercent +
      this.additionalValues.getSum(skillFilter)
    );
  }
}
