import Character from "@/Entities/Characters/Character";
import {VisionType} from "@/VisionType";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";
import SkillsManager from "@/Skills/SkillsManager";
import XianglingBaseStats from "@/Lists/Charaters/Xiangling/XianglingBaseStats";
import XianglingElemental from "@/Lists/Charaters/Xiangling/Skills/XianglingElemental";
import XianglingBurst from "@/Lists/Charaters/Xiangling/Skills/XianglingBurst";
import XianglingNormalAttack from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingNormalAttack";
import XianglingC1 from "@/Lists/Charaters/Xiangling/Conellation/XianglingC1";
import XianglingC2 from "@/Lists/Charaters/Xiangling/Conellation/XianglingC2";
import ElementConstellation from "@/Constellations/ElementConstellation";
import XianglingC4 from "@/Lists/Charaters/Xiangling/Conellation/XianglingC4";
import BurstConstellation from "@/Constellations/BurstConstellation";
import XianglingC6 from "@/Lists/Charaters/Xiangling/Conellation/XianglingC6";
import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import XianglingTalent1 from "@/Lists/Charaters/Xiangling/Talents/XianglingTalent1";
import XianglingTalent2 from "@/Lists/Charaters/Xiangling/Talents/XianglingTalent2";
import XianglingHoldAttack from "@/Lists/Charaters/Xiangling/Skills/Attacks/XianglingHoldAttack";

export default class Xiangling extends Character {
  public title: string = "Xiangling";

  public readonly rarity: number = 4;

  public vision: VisionType = VisionType.Pyro;
  public baseStats: CharacterBaseStats = new XianglingBaseStats(this);

  skillManager: SkillsManager = new SkillsManager(this, [
    new XianglingNormalAttack(),
    new XianglingHoldAttack(),
    new XianglingElemental(),
    new XianglingBurst(),
  ]);

  constellationsManager: ConstellationsManager =
    new ConstellationsManager(this,[
      new XianglingC1(),
      new XianglingC2(),
      new ElementConstellation(),
      new XianglingC4(),
      new BurstConstellation(),
      new XianglingC6(),
    ]);

  public override talent1: CharacterTalent = new XianglingTalent1(this);
  public override talent2: CharacterTalent = new XianglingTalent2(this);
}
