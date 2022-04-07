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

    const index = order - 1;

    for (let i = 0; i < this.constellations.length; i++) {
      if (i <= index) {
        const constellation = this.constellations[i];
        constellation.activate(this.character);
      }
    }

    this._current = index;
  }

  public deactivateConstellation(order: number) {
    this.activateAll();

    const index = order - 1;

    for (let i = 0; i < this.constellations.length; i++) {
      if (i >= index) {
        const constellation = this.constellations[i];
        constellation.deactivate(this.character);
      }
    }

    this._current = index;
  }

  public activateAll() {
    for (let constellation of this.constellations) {
      constellation.activate(this.character);
    }
  }

  public deactivateAll() {
    for (let constellation of this.constellations) {
      constellation.deactivate(this.character);
    }
  }
}
