import Character from "../../Character";
import NoelleBaseStats from "./NoelleBaseStats";
import CharacterBaseStats from "../../CharacterBaseStats";

export default class Noelle extends Character {
  public baseStats: CharacterBaseStats = new NoelleBaseStats(this);
}