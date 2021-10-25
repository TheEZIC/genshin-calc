import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class ElectroDmgBonusStat extends PureStat {
  calc(): number {
    const {electroDmgBonus} = this.baseStats;
    const artifactsElectroPercent = this.artifacts.getStatSumByType(ArtifactStatType.ElectroDmgBonus);

    return electroDmgBonus.value + artifactsElectroPercent + this.additionalValuesSum;
  }
}