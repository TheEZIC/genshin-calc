import OverridableEffect from "@/Effects/OverridableEffect";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {ISKillInfusionItem} from "@/Skills/SkillInfusion";
import {VisionType} from "@/VisionType";

export default class AyakaDashBuff extends OverridableEffect<Character> {
  framesDuration: number = 5 * 60; //5sec

  private dashInfusion: ISKillInfusionItem = {
    element: VisionType.Cryo,
    zIndex: 2,
  }

  protected applyEffect(character: Character): void {
    character.skillManager
      .getAllSkillsByType(SkillType.NormalAttack)
      ?.map((s) => s.infusion.add(this.dashInfusion));
  }

  protected removeEffect(character: Character): void {
    character.skillManager
      .getAllSkillsByType(SkillType.NormalAttack)
      ?.map((s) => s.infusion.remove(this.dashInfusion));
  }
}
