import Character from "@/Entities/Characters/Character";
import Constellation from "@/Constellations/Constellation";
import { SkillType } from "@/Skills/SkillType";

export default class BurstConstellation extends Constellation {
  public applyEffect(character: Character): void {
    character.skillManager
      .getSkillByType(SkillType.Burst)
      ?.lvl.addAdditional(3);
  }

  public removeEffect(character: Character): void {
    character.skillManager
      .getSkillByType(SkillType.Burst)
      ?.lvl.addAdditional(3);
  }
}
