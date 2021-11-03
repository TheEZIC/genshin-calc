import Character from "../../Character";
import NoelleBaseStats from "./NoelleBaseStats";
import CharacterBaseStats from "../../CharacterBaseStats";
import SkillsManager from "../../../Skills/SkillsManager";

export default class Noelle extends Character {
  public baseStats: CharacterBaseStats = new NoelleBaseStats(this);
  public skillManager: SkillsManager = new SkillsManager(this,[

  ]);
}