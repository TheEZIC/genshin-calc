import PureStat from "@/Entities/Characters/CalculatorStats/Types/PureStat";
import {SkillType} from "@/Skills/SkillType";

export default abstract class ReactionDmgBonusStat extends PureStat {
  override calc(skillFilter?: SkillType): number {
    return this.additionalValues.getSum(skillFilter);
  }

  override calcPure(): number {
    return 0;
  }
}
