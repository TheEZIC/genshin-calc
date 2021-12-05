import { StatType } from "@/BaseStats/StatType";
import Character from "@/Characters/Character";

import Artifact from "./Artifact";
import ArtifactSetBonuses from "./ArtifactSetBonuses";
import { ArtifactType } from "./ArtifactType";

export default class ArtifactsManager {
  constructor(public character: Character) {}

  public artifactSetBonuses = new ArtifactSetBonuses(this);

  public readonly MAXIMUM_ARTIFACTS = 5;

  private artifacts: Artifact[] = [];

  public getArtifact(artifactType: ArtifactType) {
    return this.artifacts.find((a) => a.type === artifactType);
  }

  public get artifactsCount() {
    return this.artifacts.length;
  }

  public get all() {
    return this.artifacts;
  }

  public add(artifact: Artifact) {
    const alreadyHas = this.getArtifact(artifact.type);

    if (alreadyHas) {
      this.remove(artifact.type);
    }

    if (this.artifactsCount < this.MAXIMUM_ARTIFACTS) {
      this.artifacts.push(artifact);

      if (artifact?.setBonus) {
        this.artifactSetBonuses.addSet(artifact.setBonus);
      }
    }

    return this;
  }

  public remove(artifactType: ArtifactType): this {
    const artifact = this.artifacts.find((a) => a.type === artifactType);
    //if nothing to remove
    if (!artifact) return this;

    if (artifact.setBonus) {
      this.artifactSetBonuses.removeSet(artifact.setBonus);
    }

    this.artifacts = this.artifacts.filter((a) => a.type !== artifactType);
    return this;
  }

  public update(artifact: Artifact): this {
    this.remove(artifact.type);
    this.add(artifact);
    return this;
  }

  public getStatSumByType(statType: StatType) {
    const values: number[] = [];

    for (let i = 0; i < this.artifactsCount; i++) {
      const artifact = this.artifacts[i];
      const subStat = artifact.getSubStat(statType);
      const mainStat = artifact.mainStat;

      if (mainStat?.type && mainStat.type === statType) {
        values.push(mainStat.value);
      }

      if (subStat) {
        values.push(subStat.value);
      }
    }

    return values.reduce((a, b) => a + b, 0);
  }
}
