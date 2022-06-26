import {SkillType} from "@/Skills/SkillType";
import CharacterPureStat from "@/Entities/Characters/CalculatorStats/Types/CharacterPureStat";

export default abstract class ReactionDmgBonusStat extends CharacterPureStat {
  override calc(skillFilter?: SkillType): number {
    return this.additionalValues.getSum(skillFilter);
  }

  override calcPure(): number {
    return 0;
  }
}
