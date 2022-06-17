import Character from "@/Entities/Characters/Character";
import {VisionType} from "@/VisionType";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";
import SkillsManager from "@/Skills/SkillsManager";
import XianglingBaseStats from "@/Lists/Charaters/Xiangling/XianglingBaseStats";
import XianglingElemental from "@/Lists/Charaters/Xiangling/Skills/XianglingElemental";
import XianglingBurst from "@/Lists/Charaters/Xiangling/Skills/XianglingBurst";
import XianglingNormalAttack from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingNormalAttack";

export default class Xiangling extends Character {
  public title: string = "Xiangling";

  public readonly rarity: number = 4;

  public vision: VisionType = VisionType.Pyro;
  public baseStats: CharacterBaseStats = new XianglingBaseStats(this);

  skillManager: SkillsManager = new SkillsManager(this, [
    new XianglingNormalAttack(),
    new XianglingElemental(),
    new XianglingBurst(),
  ]);

  constellationsManager: ConstellationsManager =
    new ConstellationsManager(this,[
    ]);
}
