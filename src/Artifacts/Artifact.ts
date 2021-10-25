import {ArtifactAllStats, ArtifactStatType} from "./ArtifactStatType";
import {ArtifactRarity} from "./ArtifactRarity";
import {ArtifactType} from "./ArtifactType";
import ArtifactStat from "./ArtifactStat";
import IArtifactSetStrategy from "./ArtifactSetStrategy";

export default abstract class Artifact {
  public readonly abstract type: ArtifactType;
  protected readonly abstract allowedMainStats: ArtifactStatType[];
  protected readonly allowedSubStats: ArtifactStatType[] = ArtifactAllStats;

  private rarity: ArtifactRarity = ArtifactRarity.Legendary;

  constructor(
    private _mainStat: ArtifactStat,
  ) {
  }

  public get mainStat(): ArtifactStat {
    return this._mainStat;
  }

  private subStats: ArtifactStat[] = [];

  public get subStatsCount() {
    return this.subStats.length;
  }

  public get subStatsAll() {
    return this.subStats;
  }

  protected get isMaxSubStatCountReached() {
    if (this.subStatsCount > 4)
      return true;

    switch (this.rarity) {
      case ArtifactRarity.Common:
      case ArtifactRarity.Uncommon:
        if (this.subStatsCount > 1) return true;
        break;
    }

    return false;
  }

  public getSubStat(statType: ArtifactStatType) {
    return this.subStats.find(s => s.type === statType);
  }

  public addSubStat(stat: ArtifactStat): this {
    const isMaxCountReached = this.isMaxSubStatCountReached;
    const alreadyHas = this.getSubStat(stat.type);

    if (alreadyHas) {
      return this.removeSubStat(stat.type);
    }

    if (!isMaxCountReached && stat.type !== this.mainStat.type) {
      this.subStats.push(stat);
    }

    return this;
  }

  public removeSubStat(statType: ArtifactStatType): this {
    this.subStats.filter(s => s.type !== statType);
    return this;
  }

  public updateSubStat(stat: ArtifactStat) {
    this.removeSubStat(stat.type);
    this.addSubStat(stat);
    return this;
  }

  set set(set: IArtifactSetStrategy) {

  }
}