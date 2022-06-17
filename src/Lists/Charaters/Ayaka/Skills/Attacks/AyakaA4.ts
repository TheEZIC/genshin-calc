import AyakaNormalAttackStage from "./AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";

export default class AyakaA4 extends AyakaNormalAttackStage {
  public skillName: string = "Kamisato Art: Kabuki A4";

  public override hits: number =  3;

  public frames: number = 98;
  public value: SkillValue = new SkillValue(22.65 * this.hits, 1.84 * this.hits);
}
