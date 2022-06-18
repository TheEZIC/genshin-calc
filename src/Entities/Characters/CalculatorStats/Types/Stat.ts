import { StatType } from "@/BaseStats/StatType";
import Character from "@/Entities/Characters/Character";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";
import Listener from "@/Helpers/Listener";

export default abstract class Stat {
  constructor(protected character: Character) {}

  public abstract title: string;

  /**
   * Calc stat value
   * */
  public abstract calc(skillFilter?: SkillType, tenses?: StatTense[]): number;

  /**
   * Calc displayed stat value (like in game)
   * */
  public abstract calcDisplayed(): number;

  /**
   * Calc pure stat value (without prefixes, affixes and additional values)
   * */
  public abstract calcPure(): number;

  public onChange: Listener<number> = new Listener<number>();

  /**
   * Clear this stat
   * */
  public clear(): this {
    return this;
  }

  /**
   * Get weapon value bonus by stat
   * */
  protected getWeaponValue(statType: StatType) {
    const { weaponManager } = this.character;

    return weaponManager.weapon?.mainStat.isType(statType)
      ? weaponManager.weapon?.mainStat.value
      : 0;
  }

  /**
   * Get artifacts value bonus by stat
   * */
  protected getArtifactsValue(statType: StatType) {
    const { artifactsManager } = this.character;

    return artifactsManager.getStatSumByType(statType);
  }
}
