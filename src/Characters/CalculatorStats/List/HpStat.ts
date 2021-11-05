import { StatType } from "@/BaseStats/StatType";
import MainStat from "@/Characters/CalculatorStats/Types/MainStat";

export default class HpStat extends MainStat {
  calc(): number {
    const { baseHP, percentHP } = this.character.baseStats;
    const artifactsFlatHP = this.getArtifactsValue(StatType.FlatHP);
    const artifactsPercentHP = this.getArtifactsValue(StatType.PercentHP);

    return (
      baseHP.value *
      (1 + (percentHP.value + artifactsPercentHP + this.prefixesSum) / 100 + artifactsFlatHP + this.additionalValuesSum) *
      (1 + this.affixesSum / 100)
    );
  }
}
