import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";

export default class ElementaryMasteryStat extends PureStat {
  calc(): number {
    const { elementalMastery } = this.character.baseStats;
    const artifactsElementalMastery = this.getArtifactsValue(StatType.ElementalMastery);

    return elementalMastery.value + artifactsElementalMastery + this.additionalValuesSum;
  }

  public get vaporizeAndMeltReactionBonus() {
    const EM = this.calc();
    return 278 * (EM / (EM + 1400));
  }

  public get anemoAndElectroReactionBonus() {
    const EM = this.calc();
    return 1600 * (EM / (EM + 2000));
  }

  public get crystallizeReactoinBonus() {
    const EM = this.calc();
    return 444 * (EM / (EM + 1400));
  }
}
