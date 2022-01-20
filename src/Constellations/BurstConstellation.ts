import Character from "@/Characters/Character";
import Constellation from "@/Constellations/Constellation";
import { SkillType } from "@/Skills/SkillType";

export default class BurstConstellation extends Constellation {
  public applyEffect(character: Character): void {
    character.skillManager
      .getSkillByType(SkillType.Burst)
      ?.addAdditionalLvl(3);
  }

  public removeEffect(character: Character): void {
    character.skillManager
      .getSkillByType(SkillType.Burst)
      ?.removeAdditionalLvl(3);
  }
}
