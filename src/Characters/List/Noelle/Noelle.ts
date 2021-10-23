import Character from "../../Character";
import NoelleBaseStats from "./NoelleBaseStats";
import CharacterBaseStats from "../../Stats/CharacterBaseStats";

export default class Noelle extends Character {
  public baseStats: CharacterBaseStats = new NoelleBaseStats(this);
}