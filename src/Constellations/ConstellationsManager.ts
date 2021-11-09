import Character from "@/Characters/Character";
import { IConstellation } from "@/Constellations/IConstellation";

export default class ConstellationsManager {
  constructor(
    private character: Character,
    public constellations: IConstellation[]
  ) {}

  public activateConstellation(order: number) {
    this.constellations[order - 1].activate(this.character);
  }

  public deactivateConstellation(order: number) {
    this.constellations[order - 1].deactivate(this.character);
  }
}
