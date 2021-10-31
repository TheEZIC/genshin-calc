import MainStat from "../Types/MainStat";
import {StatType} from "../../../BaseStats/StatType";

export default class AtkStat extends MainStat {
  calc(): number {
    const {baseATK, percentATK} = this.character.baseStats;
    const artifactsFlatATK = this.getArtifactsValue(StatType.FlatATK);
    const artifactsPercentATK = this.getArtifactsValue(StatType.PercentATK);
    const weaponPercentATK: number = this.getWeaponValue(StatType.PercentATK);

    return (baseATK.value + (this.character.weaponManager.weapon?.baseATK.value ?? 0))
      * (1 + (percentATK.value + artifactsPercentATK + weaponPercentATK + this.prefixesSum) / 100
        + artifactsFlatATK
        + this.additionalValuesSum)
      * (1 + (this.affixesSum) / 100);
  }
}