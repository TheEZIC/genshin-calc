import AyakaNormalAttack from "./AyakaNormalAttack";
import SkillValue from "@/Skills/SkillValue";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";

export default class AyakaA4 extends AyakaNormalAttack implements IMultipleHitSkill {
  public skillName: string = "Kamisato Art: Kabuki A4";

  public frames: number = 98;
  public hits: number =  3;
  public value: SkillValue = new SkillValue(22.65 * this.hits, 1.84 * this.hits);
}
