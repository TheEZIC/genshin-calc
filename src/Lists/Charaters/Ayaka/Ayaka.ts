import Character from "@/Entities/Characters/Character";
import CharacterBaseStats from "@/Entities/Characters/CharacterBaseStats";
import BurstConstellation from "@/Constellations/BurstConstellation";
import ConstellationsManager from "@/Constellations/ConstellationsManager";
import ElementConstellation from "@/Constellations/ElementConstellation";
import SkillsManager from "@/Skills/SkillsManager";

import AyakaBaseStats from "./AyakaBaseStats";
import AyakaA1 from "./Skills/Attacks/AyakaA1";
import AyakaA2 from "./Skills/Attacks/AyakaA2";
import AyakaA3 from "./Skills/Attacks/AyakaA3";
import AyakaA4 from "./Skills/Attacks/AyakaA4";
import AyakaA5 from "./Skills/Attacks/AyakaA5";
import AyakaBurst from "./Skills/AyakaBurst";
import AyakaElemental from "./Skills/AyakaElemental";
import {VisionType} from "@/VisionType";
import CharacterTalent from "@/Entities/Characters/CharacterTalent";
import AyakaHoldAttack from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaHoldAttack";
import AyakaDash from "@/Lists/Charaters/Ayaka/Skills/AyakaDash";
import AyakaTalent1 from "@/Lists/Charaters/Ayaka/Talents/AyakaTalent1";
import AyakaTalent2 from "@/Lists/Charaters/Ayaka/Talents/AyakaTalent2";
import AyakaC1 from "@/Lists/Charaters/Ayaka/Constellation/AyakaC1";
import AyakaC2 from "@/Lists/Charaters/Ayaka/Constellation/AyakaC2";
import AyakaC4 from "@/Lists/Charaters/Ayaka/Constellation/AyakaC4";
import AyakaC6 from "@/Lists/Charaters/Ayaka/Constellation/AyakaC6";

export default class Ayaka extends Character {
  public title: string = "Ayaka";

  public vision: VisionType = VisionType.Cryo;
  public baseStats: CharacterBaseStats = new AyakaBaseStats(this);

  public skillManager: SkillsManager = new SkillsManager(this, [
    new AyakaA1(),
    new AyakaA2(),
    new AyakaA3(),
    new AyakaA4(),
    new AyakaA5(),
    new AyakaHoldAttack(),
    new AyakaDash(),
    new AyakaElemental(),
    new AyakaBurst()
  ]);

  public constellationsManager: ConstellationsManager =
    new ConstellationsManager(this, [
      new AyakaC1(),
      new AyakaC2(),
      new ElementConstellation(),
      new AyakaC4(),
      new BurstConstellation(),
      new AyakaC6()
    ]);

  public override talent1: CharacterTalent = new AyakaTalent1(this);
  public override talent2: CharacterTalent = new AyakaTalent2(this);
}
