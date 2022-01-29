import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import Skill from "@/Skills/Skill";

export default class BurstSkillStrategy extends SkillStrategy  {
  type: SkillType = SkillType.Burst;

  runStartListener(character: Character): void {
    character.listeners.BurstSkillStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.BurstSkillEnded.notifyAll({entity: character});
  }

  public addEnergy(energy: number): void {
    const burst = this.skill as unknown as IBurstSkill;
    burst.currentEnergy += energy;

    if (burst.currentEnergy > burst.energyCost) {
      burst.currentEnergy = burst.energyCost;
    }
  }
}
