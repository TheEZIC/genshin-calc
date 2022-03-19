import { StatType } from "@/BaseStats/StatType";
import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import { SkillType } from "@/Skills/SkillType";

export default class ElementaryMasteryStat extends PureStat {
  calc(skillFilter?: SkillType): number {
    const { elementalMastery } = this.character.baseStats;
    const artifactsElementalMastery = this.getArtifactsValue(
      StatType.ElementalMastery
    );

    return (
      elementalMastery.value +
      artifactsElementalMastery +
      this.additionalValues.getSum(skillFilter)
    );
  }

  public get multipliedReactionBonus() {
    const EM = this.calc();
    return 278 * (EM / (EM + 1400));
  }

  public get transformativeReactionBonus() {
    const EM = this.calc();
    return 1600 * (EM / (EM + 2000));
  }

  public get crystallizeReactionBonus() {
    const EM = this.calc();
    return 444 * (EM / (EM + 1400));
  }
}