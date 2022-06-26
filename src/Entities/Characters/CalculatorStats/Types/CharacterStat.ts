import Stat from "@/CalculatorStats/Stat";
import Character from "@/Entities/Characters/Character";
import {StatType} from "@/BaseStats/StatType";

export default abstract class CharacterStat extends Stat<Character> {
  /**
   * Get weapon value bonus by stat
   * */
  protected getWeaponValue(statType: StatType) {
    const { weaponManager } = this.entity;

    return weaponManager.weapon?.mainStat.isType(statType)
      ? weaponManager.weapon?.mainStat.value
      : 0;
  }

  /**
   * Get artifacts value bonus by stat
   * */
  protected getArtifactsValue(statType: StatType) {
    const { artifactsManager } = this.entity;

    return artifactsManager.getStatSumByType(statType);
  }
}
