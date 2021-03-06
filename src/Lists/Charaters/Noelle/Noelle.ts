import Character from "@/Entities/Characters/Character";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import SkillsManager from "@/Skills/SkillsManager";
import NoelleBaseStats from "./NoelleBaseStats";
import {VisionType} from "@/VisionType";
import NoelleNormalAttack from "@/Lists/Charaters/Noelle/Skills/Attacks/NoelleNormalAttack";
import NoelleElemental from "@/Lists/Charaters/Noelle/NoelleElemental";

export default class Noelle extends Character {
  public title: string = "Noelle";

  public readonly rarity: number = 4;

  public vision: VisionType = VisionType.Geo;
  public baseStats: CharacterBaseStats = new NoelleBaseStats(this);

  public skillManager: SkillsManager = new SkillsManager(this, [
    new NoelleNormalAttack(),
    new NoelleElemental(),
  ]);

  public constellationsManager: ConstellationsManager =
    new ConstellationsManager(this, []);
}
