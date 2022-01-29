import SkillStrategy from "@/Skills/SkillStrategy";
import Character from "@/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";

export default class BurstSkillStrategy extends SkillStrategy<IBurstSkill> {
  type: SkillType = SkillType.Burst;

  runStartListener(character: Character): void {
    character.listeners.BurstSkillStarted.notifyAll({entity: character});
  }

  runEndListener(character: Character) {
    character.listeners.BurstSkillEnded.notifyAll({entity: character});
  }

  private currentEnergy: number = this.skill.energyCost;

  public addEnergy(energy: number) {
    this.currentEnergy += energy;

    if (this.currentEnergy > this.skill.energyCost) {
      this.currentEnergy = this.skill.energyCost;
    }
  }
}
