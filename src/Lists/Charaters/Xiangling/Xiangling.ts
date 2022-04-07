import Character from "@/Entities/Characters/Character";
import {VisionType} from "@/VisionType";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";
import SkillsManager from "@/Skills/SkillsManager";
import XianglingBaseStats from "@/Lists/Charaters/Xiangling/XianglingBaseStats";
import XianglingElemental from "@/Lists/Charaters/Xiangling/Skills/XianglingElemental";
import XianglingBurst from "@/Lists/Charaters/Xiangling/Skills/XianglingBurst";

export default class Xiangling extends Character {
  vision: VisionType = VisionType.Pyro;
  baseStats: CharacterBaseStats = new XianglingBaseStats(this);

  skillManager: SkillsManager = new SkillsManager(this, [
    new XianglingElemental(),
    new XianglingBurst(),
  ]);

  constellationsManager: ConstellationsManager =
    new ConstellationsManager(this,[
    ]);
}
