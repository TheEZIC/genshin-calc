import PureStat from "../Types/PureStat";
import {ArtifactStatType} from "../../../Artifacts/ArtifactStatType";

export default class EnergyRechargeStat extends PureStat {
  calc(): number {
    const {energyRecharge} = this.baseStats;
    const artifactsEnergyRecharge = this.artifacts.getStatSumByType(ArtifactStatType.EnergyRecharge);

    return energyRecharge.value + artifactsEnergyRecharge + this.additionalValuesSum;
  }
}