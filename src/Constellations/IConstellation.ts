import Character from "@/Characters/Character";

export interface IConstellation {
  activate: (character: Character) => void;
  deactivate: (character: Character) => void;
}
