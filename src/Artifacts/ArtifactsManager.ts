import Artifact from "./Artifact";
import {ArtifactType} from "./ArtifactType";
import {ArtifactStatType} from "./ArtifactStatType";
import Character from "../Characters/Character";

export default class ArtifactsManager {
  constructor(
    public character: Character,
  ) {
  }

  private artifacts: Artifact[] = [];

  public getArtifact(artifactType: ArtifactType) {
    return this.artifacts.find(a => a.type === artifactType);
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

    if (this.artifactsCount < 5) {
      this.artifacts.push(artifact);
    }

    return this;
  }

  public remove(artifactType: ArtifactType): this {
    this.artifacts.filter(a => a.type !== artifactType);
    return this;
  }

  public update(artifact: Artifact): this {
    this.remove(artifact.type);
    this.add(artifact);
    return this;
  }

  public getStatSumByType(statType: ArtifactStatType) {
    const values: number[] = [];

    for (let i = 0; i < this.artifactsCount; i++) {
      const artifact = this.artifacts[i];
      const subStat = artifact.getSubStat(statType);
      const mainStat = artifact.mainStat;

      if (mainStat.type === statType) {
        values.push(mainStat.value);
      }

      if (subStat) {
        values.push(subStat.value);
      }
    }

    return values.reduce((a, b) => a + b, 0);
  }

  public calcSetBonuses(): this {
    //TODO
    return this;
  }
}