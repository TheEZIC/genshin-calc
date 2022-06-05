import { StatType } from "@/BaseStats/StatType";
import Character from "@/Entities/Characters/Character";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/Entities/Characters/CalculatorStats/Types/StatController";
import Listener from "@/Helpers/Listener";

export default abstract class Stat {
  constructor(protected character: Character) {}

  public abstract title: string;

  /**
   * Calc this stat value
   * @return {number} - calculated value
   * */
  public abstract calc(skillFilter?: SkillType, tenses?: StatTense[]): number;
  public abstract calcPure(): number;

  public onChange: Listener<number> = new Listener<number>();

  /**
   * Clear this stat
   * @return {Stat} - this
   * */
  public clear(): this {
    return this;
  }

  /**
   * Get weapon value bonus by stat
   * @param {StatType} statType - stat type
   * @return {number} - value
   * */
  protected getWeaponValue(statType: StatType) {
    const { weaponManager } = this.character;

    return weaponManager.weapon?.mainStat.isType(statType)
      ? weaponManager.weapon?.mainStat.value
      : 0;
  }

  /**
   * Get artifacts value bonus by stat
   * @param {StatType} statType - stat type
   * @return {number} - value
   * */
  protected getArtifactsValue(statType: StatType) {
    const { artifactsManager } = this.character;

    return artifactsManager.getStatSumByType(statType);
  }
}
