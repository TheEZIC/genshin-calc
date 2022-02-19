import AyakaNormalAttack from "./AyakaNormalAttack";
import SkillValue from "@/Skills/SkillValue";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";

export default class AyakaA4 extends AyakaNormalAttack implements IMultipleHitSkill {
  frames: number = 98;
  hits: number =  3;
  value: SkillValue = new SkillValue(22.65 * this.hits, 1.84 * this.hits);
}
