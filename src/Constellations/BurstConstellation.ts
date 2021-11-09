import Character from "@/Characters/Character";
import { IConstellation } from "@/Constellations/IConstellation";
import { SkillType } from "@/Skills/SkillType";

export default class BurstConstellation implements IConstellation {
  public activate(character: Character): void {
    character.skillManager.getSkillByType(SkillType.Burst)?.addAdditionalLvl(3);
  }

  public deactivate(character: Character): void {
    character.skillManager
      .getSkillByType(SkillType.Burst)
      ?.removeAdditionalLvl(3);
  }
}
