import Character from "@/Characters/Character";
import { IConstellation } from "@/Constellations/IConstellation";

export default class AyakaC4 implements IConstellation {
  activate(character: Character): void {}

  deactivate(character: Character): void {}
}
