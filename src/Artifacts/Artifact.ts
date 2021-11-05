import Stat from "@/BaseStats/Stat";
import { AllStatsType, StatType } from "@/BaseStats/StatType";

import { ArtifactRarity } from "./ArtifactRarity";
import ArtifactSet from "./ArtifactSet";
import { ArtifactType } from "./ArtifactType";

export default abstract class Artifact {
  public abstract readonly type: ArtifactType;
  protected abstract readonly allowedMainStats: StatType[];
  protected readonly allowedSubStats: StatType[] = AllStatsType;

  private rarity: ArtifactRarity = ArtifactRarity.Legendary;

  private _mainStat: Stat | null = null;

  /**
   * Set main stat of artifact
   * @param {Stat} stat - main stat
   * @return {Artifact} - this
   * */
  public setMainStat(stat: Stat): this {
    const isUsedInSubStat = Boolean(this.getSubStat(stat.type));
    if (isUsedInSubStat) return this;
    this._mainStat = stat;
    return this;
  }

  /**
   * Remove main stat of artifact
   * @return {Artifact} - this
   * */
  public removeMainStat(): this {
    this._mainStat = null;
    return this;
  }

  /**
   * Main stat
   * @return {Stat | null} - stat
   * */
  public get mainStat(): Stat | null {
    return this._mainStat;
  }

  private subStats: Stat[] = [];

  /**
   * Count of sub stats
   * @return {number}
   * */
  public get subStatsCount() {
    return this.subStats.length;
  }

  /**
   * All artifact substats
   * @return {Stat[]} - sub stats
   * */
  public get allSubStats(): Stat[] {
    return this.subStats;
  }

  /**
   * Is max stat count reached
   * @return {boolean} - reached or not
   * */
  protected get isMaxSubStatCountReached(): boolean {
    if (this.subStatsCount > 4) return true;

    switch (this.rarity) {
      case ArtifactRarity.Common:
      case ArtifactRarity.Uncommon:
        if (this.subStatsCount > 1) return true;
        break;
    }

    return false;
  }

  /**
   * Get sub stat by stat type
   * @param {StatType} statType - stat type to search for
   * @return {Stat | undefined} - stat or undefined
   * */
  public getSubStat(statType: StatType): Stat | undefined {
    return this.subStats.find((s) => s.type === statType);
  }

  /**
   * Add sub stat to artifact
   * @param {Stat} stat - sub stat to add
   * @return {Artifact} - this
   * */
  public addSubStat(stat: Stat): this {
    const isMaxCountReached = this.isMaxSubStatCountReached;
    const alreadyHas = this.getSubStat(stat.type);

    if (alreadyHas) {
      return this.removeSubStat(stat.type);
    }

    if (!isMaxCountReached && stat.type !== this.mainStat?.type) {
      this.subStats.push(stat);
    }

    return this;
  }

  /**
   * Remove sub stat by type
   * @param {StatType} statType - sub stat to add
   * @return {Artifact} - this
   * */
  public removeSubStat(statType: StatType): this {
    this.subStats.filter((s) => s.type !== statType);
    return this;
  }

  /**
   * Update sub stat
   * @param {Stat} stat - stat to update
   * @return {Artifact} - this
   * */
  public updateSubStat(stat: Stat): this {
    this.removeSubStat(stat.type);
    this.addSubStat(stat);
    return this;
  }

  private _setBonus: ArtifactSet | null = null;

  /**
   * Add set bonus to artifact
   * @param {ArtifactSet} set - artifact set to add as set bonus
   * @return {Artifact} - this
   * */
  public addSetBonus(set: ArtifactSet): this {
    this._setBonus = set;
    return this;
  }

  /**
   * Remove set bonus from artifact
   * @return {Artifact} - this
   * */
  public removeSetBonus(): this {
    this._setBonus = null;
    return this;
  }

  /**
   * Set bonus
   * @return {ArtifactSet | null} - set bonus
   * */
  get setBonus(): ArtifactSet | null {
    return this._setBonus;
  }
}
