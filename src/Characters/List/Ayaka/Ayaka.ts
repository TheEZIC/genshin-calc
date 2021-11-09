import Character from "@/Characters/Character";
import CharacterBaseStats from "@/Characters/CharacterBaseStats";
import AyakaC1 from "@/Characters/List/Ayaka/Constellation/AyakaC1";
import AyakaC2 from "@/Characters/List/Ayaka/Constellation/AyakaC2";
import AyakaC4 from "@/Characters/List/Ayaka/Constellation/AyakaC4";
import AyakaC6 from "@/Characters/List/Ayaka/Constellation/AyakaC6";
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

export default class Ayaka extends Character {
  public baseStats: CharacterBaseStats = new AyakaBaseStats(this);
  public skillManager: SkillsManager = new SkillsManager(this, [
    new AyakaA1(),
    new AyakaA2(),
    new AyakaA3(),
    new AyakaA4(),
    new AyakaA5(),
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
}
