import Roster from "@/Roster/Roster";
import Character from "@/Characters/Character";
import {IBurstSkill} from "@/Skills/SkillTypes/IBurstSkill";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {VisionType} from "@/VisionType";

export interface IEnergyParticles {
  type: VisionType | null;
  isOrb?: boolean;
  count: number;
}

export default class EnergyManager {
  constructor(
    private roster: Roster
  ) {
  }

  public addEnergy(particles: IEnergyParticles) {
    const {isOrb} = particles;
    const burstSkillItems = this.roster
      .charactersSkills
      .filter(item => item.skill.strategy instanceof BurstSkillStrategy);

    for (let burstSkillItem of burstSkillItems) {
      const {character, skill} = burstSkillItem;
      const burstSkill = skill as unknown as IBurstSkill;

      const penaltyValue = (value: number, penalty: number): number => {
        return particles.count
          * this.calcEnergy(
            character,
            this.calcRosterPenalty(isOrb ? value * 3 : value, penalty)
          );
      }

      const value = (value: number): number => {
        return particles.count * this.calcEnergy(character, isOrb ? value * 3 : value);
      }

      if (particles.type) {
        if (this.isActive(character)) {
          if (particles.type === character.vision) {
            burstSkill.strategy.addEnergy(value(3));
          } else {
            burstSkill.strategy.addEnergy(value(1));
          }
        } else if (this.isInactive(character)) {
          if (particles.type === character.vision) {
            burstSkill.strategy.addEnergy(penaltyValue(2.4, 0.3));
          } else {
            burstSkill.strategy.addEnergy(penaltyValue(0.8, 0.1));
          }
        }
      } else {
        if (this.isActive(character)) {
          burstSkill.strategy.addEnergy(value(2));
        } else if (this.isInactive(character)) {
          burstSkill.strategy.addEnergy(penaltyValue(1.6, 0.2));
        }
      }
    }
  }

  private isInactive(character: Character): boolean {
    const inactive = this.roster.inactiveCharacters;
    return Boolean(inactive.find(c => c.name === character.name));
  }

  private isActive(character: Character): boolean {
    const active = this.roster.activeCharacter;
    return active.name === character.name;
  }

  private calcRosterPenalty(value: number, penaltyStep: number) {
    const rosterSize = this.roster.characters.length;

    if (rosterSize === 1) {
      return value;
    }

    return value - penaltyStep * (rosterSize - 2);
  }

  private calcEnergy(character: Character, value: number) {
    const characterERBonus = character.calculatorStats.energyRecharge.calc() / 100;
    return value * characterERBonus;
  }
}
