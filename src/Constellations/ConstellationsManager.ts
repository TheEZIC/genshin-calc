import Character from "@/Entities/Characters/Character";
import Constellation from "@/Constellations/Constellation";

export default class ConstellationsManager {
  constructor(
    private character: Character,
    public constellations: Constellation[]
  ) {}

  private MAX_INDEX = 6;

  public getAt(constellationIndex: number) {
    if (constellationIndex > this.MAX_INDEX) return;
    return this.constellations[constellationIndex - 1];
  }

  private _current: number = 0;

  public get current(): number {
    return this._current + 1;
  }

  public activateConstellation(order: number) {
    this.deactivateAll();

    if (order === 0) {
      return;
    }

    const index = order - 1;

    for (let i = 0; i < this.constellations.length; i++) {
      if (i <= index && !this.constellations[i].isActive) {
        const constellation = this.constellations[i];
        constellation.activate(this.character);
      }
    }

    this._current = index;
  }

  public activateAll() {
    for (let constellation of this.constellations) {
      if (!constellation.isActive) {
        constellation.activate(this.character);
      }
    }
  }

  public deactivateAll() {
    for (let constellation of this.constellations) {
      if (constellation.isActive) {
        constellation.deactivate(this.character);
      }
    }
  }
}
