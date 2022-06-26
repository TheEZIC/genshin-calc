import { StatType } from "@/BaseStats/StatType";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default class ElementaryMasteryStat extends CharacterPureStat {
  public title: string = "ElementaryMastery";

  calc(skillFilter?: SkillType, tenses?: StatTense[]): number {
    const { elementalMastery } = this.entity.baseStats;
    const artifactsElementalMastery = this.getArtifactsValue(
      StatType.ElementalMastery
    );

    return (
      elementalMastery.value +
      artifactsElementalMastery +
      this.additionalValues.getSum(skillFilter, tenses)
    );
  }

  calcPure(): number {
    const { elementalMastery } = this.entity.baseStats;
    const artifactsElementalMastery = this.getArtifactsValue(
      StatType.ElementalMastery
    );

    return (
      elementalMastery.value +
      artifactsElementalMastery
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
