import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class ElementaryMasteryStat extends PureStat {
  calc(): number {
    const {elementalMastery} = this.baseStats;
    const artifactsElementalMastery = this.artifacts.getStatSumByType(ArtifactStatType.ElementalMastery);

    return elementalMastery.value + artifactsElementalMastery + this.additionalValuesSum;
  }
}