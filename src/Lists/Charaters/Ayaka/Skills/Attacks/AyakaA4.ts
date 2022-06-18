import AyakaNormalAttackStage from "./AyakaNormalAttackStage";
import SkillValue from "@/Skills/SkillValue";
import {IMultipleHitSkill} from "@/Skills/SkillInterfaces/IMultipleHitSkill";

export default class AyakaA4 extends AyakaNormalAttackStage {
  public skillName: string = "Kamisato Art: Kabuki A4";

  public override hits: number =  3;

  public frames: number = 98;
  public value: SkillValue = new SkillValue(22.65 * this.hits, 24.49 * this.hits, 28.97 * this.hits);
}
