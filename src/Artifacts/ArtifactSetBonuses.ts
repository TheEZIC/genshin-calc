import ArtifactSet from "./ArtifactSet";
import ArtifactsManager from "./ArtifactsManager";

interface ICurrentSetsItem {
  type: string;
  item: ArtifactSet;
}

export default class ArtifactSetBonuses {
  constructor(
    private manager: ArtifactsManager,
  ) {
  }

  private sets: ArtifactSet[] = [];

  private currentSetsByType: ICurrentSetsItem[][] = [];

  public calcSetBonuses() {
    this.currentSetsByType = [];

    for (let set of this.sets) {
      const currentSetType = set.type;
      const exists = this.currentSetsByType.find(s => s[0].type === currentSetType);
      const item = {
        type: currentSetType,
        item: set,
      };

      if (!exists || !exists.length) {
        this.currentSetsByType.push([item]);
      } else {
        exists.push(item);

        if (exists.length === 2) {
          exists[0].item.computeTwoPieceBonuses(this.manager.character);
        }
        if (exists.length === 4) {
          exists[0].item.computeTwoPieceBonuses(this.manager.character);
        }
      }
    }
  }

  private findSet(artifactSetType: string) {
    return this.sets.find(s => s.type === artifactSetType);
  }

  public addSet(artifactSet: ArtifactSet) {
    if (this.sets.length > this.manager.MAXIMUM_ARTIFACTS) {
      return;
    }

    this.sets.push(artifactSet);
    this.calcSetBonuses();
  }

  public removeSet(artifactSet: ArtifactSet) {
    const set = this.findSet(artifactSet.type);
    if (!set) return; //if nothing to remove

    const exists = this.currentSetsByType.find(s => s[0].type === set.type);

    if (exists && exists.length === 2) {
      set.removeTwoSetBonuses(this.manager.character);
    }
    if (exists && exists.length === 4) {
      set.removeFourSetBonuses(this.manager.character);
    }

    let isDeleted = false;

    this.sets = this.sets.filter(s => {
      if (s.type === artifactSet.type && !isDeleted) {
        isDeleted = true;
        return false;
      }

      return true;
    });

    this.calcSetBonuses();
  }
}