import OverridableEffect from "@/Effects/OverridableEffect";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {ISKillInfusionItem} from "@/Skills/SkillInfusion";
import {VisionType} from "@/VisionType";
import NormalAttackSkill from "@/Skills/Defaults/NormalAttackSkill";

export default class AyakaDashBuff extends OverridableEffect<Character> {
  frames: number = 5 * 60; //5sec

  private dashInfusion: ISKillInfusionItem = {
    element: VisionType.Cryo,
    zIndex: 2,
  }

  protected applyEffect(character: Character): void {
    const normalAttackSkill = character.skillManager.getSkillByType(SkillType.NormalAttack) as NormalAttackSkill;
    const holdAttackSkill = character.skillManager.getSkillByType(SkillType.HoldAttack);

    normalAttackSkill.attackStages.forEach(stage => {
      stage.infusion.add(this.dashInfusion)
    });


    holdAttackSkill?.infusion.add(this.dashInfusion);
  }

  protected removeEffect(character: Character): void {
    const normalAttackSkill = character.skillManager.getSkillByType(SkillType.NormalAttack) as NormalAttackSkill;
    const holdAttackSkill = character.skillManager.getSkillByType(SkillType.HoldAttack);

    normalAttackSkill.attackStages.forEach(stage => {
      stage.infusion.remove(this.dashInfusion)
    });

    holdAttackSkill?.infusion.remove(this.dashInfusion);
  }
}
