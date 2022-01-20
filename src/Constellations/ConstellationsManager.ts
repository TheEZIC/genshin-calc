import Character from "@/Characters/Character";
import Constellation from "@/Constellations/Constellation";

export default class ConstellationsManager {
  constructor(
    private character: Character,
    public constellations: Constellation[]
  ) {}

  public activateConstellation(order: number) {
    const index = order - 1;

    for (let i = 0; i < this.constellations.length; i++) {
      if (i < index) {

      }
      const constellation = this.constellations[i];

    }
    this.constellations[index].activate(this.character);
  }

  public deactivateConstellation(order: number) {
    this.constellations[order - 1].deactivate(this.character);
  }
}
