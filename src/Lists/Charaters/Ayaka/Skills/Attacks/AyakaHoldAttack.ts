import NormalSkill from "@/Skills/NormalSkill";
import {IMultipleHitSkill} from "@/Skills/IMultipleHitSkill";
import SkillValue from "@/Skills/SkillValue";
import SkillStrategy from "@/Skills/SkillStrategy";
import HoldAttackSkillStrategy from "@/Skills/SkillStrategy/HoldAttackSkillStrategy";
import {ICalcDamageArgs} from "@/Skills/Skill";
import {SkillType} from "@/Skills/SkillType";
import {SkillTargetType} from "@/Skills/SkillTargetType";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import AyakaA1 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA1";
import AyakaA2 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA2";
import AyakaA3 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA3";
import AyakaA4 from "@/Lists/Charaters/Ayaka/Skills/Attacks/AyakaA4";

export default class AyakaHoldAttack extends NormalSkill implements IMultipleHitSkill {
  public strategy: SkillStrategy = new HoldAttackSkillStrategy(this);
  public frames: number = 0;
  public hits: number = 3;

  protected value: SkillValue = new SkillValue(55.13 * this.hits, (59.61 - 55.13) * this.hits);

  public targetType: SkillTargetType = SkillTargetType.AOE;
  public damageRegistrationType: SkillDamageRegistrationType = SkillDamageRegistrationType.Adaptive;

  protected calcDamage({character, prevSkill}: ICalcDamageArgs): number {
    if (!prevSkill) {
      this.frames = 0;
      return 0;
    }

    const attackSkills = character.skillManager.getAllSkillsByType(SkillType.NormalAttack);

    if (prevSkill instanceof AyakaA1) {
      this.frames = 96 - (attackSkills.find((s) => s instanceof AyakaA1)?.frames ?? 0);
    } else if (prevSkill instanceof AyakaA2) {
      this.frames = 115 - (attackSkills.find((s) => s instanceof AyakaA2)?.frames ?? 0);
    } else if (prevSkill instanceof AyakaA3) {
      this.frames = 140 - (attackSkills.find((s) => s instanceof AyakaA3)?.frames ?? 0);
    } else if (prevSkill instanceof AyakaA4) {
      this.frames = 171 - (attackSkills.find((s) => s instanceof AyakaA4)?.frames ?? 0);
    } else {
      this.frames = 0;
      return 0;
    }

    const atk = character.calculatorStats.ATK.calc();
    const dmg = this.MVs * atk;

    return dmg;
  }
}
