import Character from "../../Character";
import CharacterBaseStats from "../../CharacterBaseStats";
import AyakaBaseStats from "./AyakaBaseStats";
import SkillsManager from "../../../Skills/SkillsManager";
import AyakaA1 from "./Skills/Attacks/AyakaA1";
import AyakaA2 from "./Skills/Attacks/AyakaA2";
import AyakaA3 from "./Skills/Attacks/AyakaA3";
import AyakaA4 from "./Skills/Attacks/AyakaA4";
import AyakaA5 from "./Skills/Attacks/AyakaA5";

export default class Ayaka extends Character {
  public baseStats: CharacterBaseStats = new AyakaBaseStats(this);
  public skillManager: SkillsManager = new SkillsManager(this,[
    new AyakaA1(),
    new AyakaA2(),
    new AyakaA3(),
    new AyakaA4(),
    new AyakaA5(),
  ]);
}