import Buff from "@/Buffs/Buff";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";

export default class AyakaDashInfusionBuff extends Buff {
  framesDuration: number = 5 * 60; //5 sec

  apply(character: Character): void {
    character.skillManager.getSkillByType(SkillType.Attack)?.changeInfusion(true);
  }

  remove(character: Character): void {
    character.skillManager.getSkillByType(SkillType.Attack)?.changeInfusion(false);
  }
}