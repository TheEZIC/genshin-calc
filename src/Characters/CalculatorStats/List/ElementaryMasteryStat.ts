import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class ElementaryMasteryStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { elementalMastery } = this.character.baseStats;
    const artifactsElementalMastery = this.getArtifactsValue(StatType.ElementalMastery);

    return elementalMastery.value + artifactsElementalMastery + this.getAdditionalValuesSum(skillFilter);
  }

  public get vaporizeAndMeltReactionBonus() {
    const EM = this.calc();
    return 278 * (EM / (EM + 1400));
  }

  public get anemoAndElectroReactionBonus() {
    const EM = this.calc();
    return 1600 * (EM / (EM + 2000));
  }

  public get crystallizeReactionBonus() {
    const EM = this.calc();
    return 444 * (EM / (EM + 1400));
  }
}
