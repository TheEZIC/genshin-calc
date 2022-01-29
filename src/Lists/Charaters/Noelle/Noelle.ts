import Character from "@/Characters/Character";
import CharacterBaseStats from "@/Characters/CharacterBaseStats";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import SkillsManager from "@/Skills/SkillsManager";

import NoelleBaseStats from "./NoelleBaseStats";
import {VisionType} from "@/VisionType";

export default class Noelle extends Character {
  public vision: VisionType = VisionType.Geo;
  public baseStats: CharacterBaseStats = new NoelleBaseStats(this);
  public skillManager: SkillsManager = new SkillsManager(this, []);
  public constellationsManager: ConstellationsManager =
    new ConstellationsManager(this, []);
}