import Roster from "@/Roster/Roster";
import Character from "@/Entities/Characters/Character";
import BurstSkillStrategy from "@/Skills/SkillStrategy/BurstSkillStrategy";
import {VisionType} from "@/VisionType";
import SingletonsManager from "@/Singletons/SingletonsManager";
import DamageCalculator from "@/Roster/DamageCalculator";

export interface IEnergyParticles {
  type: VisionType | null;
  isOrb?: boolean;
  count: number;
}

export default class EnergyManager {
  constructor(
    public damageCalculator: DamageCalculator,
  ) {
  }

  public addEnergy(particles: IEnergyParticles) {
    const {roster} = this.damageCalculator;
    const {isOrb} = particles;
    const burstSkillItems = roster.charactersSkills
      .filter(item => item.skill.strategy instanceof BurstSkillStrategy);

    for (let burstSkillItem of burstSkillItems) {
      const {character, skill} = burstSkillItem;

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
        if (roster.isActive(character)) {
          if (particles.type === character.vision) {
            character.addEnergy(value(3));
          } else {
            character.addEnergy(value(1));
          }
        } else if (roster.isInactive(character)) {
          if (particles.type === character.vision) {
            character.addEnergy(penaltyValue(2.4, 0.3));
          } else {
            character.addEnergy(penaltyValue(0.8, 0.1));
          }
        }
      } else {
        if (roster.isActive(character)) {
          character.addEnergy(value(2));
        } else if (roster.isInactive(character)) {
          character.addEnergy(penaltyValue(1.6, 0.2));
        }
      }
    }
  }

  private calcRosterPenalty(value: number, penaltyStep: number) {
    const rosterSize = this.damageCalculator.roster.characters.length;

    if (rosterSize === 1) {
      return value;
    }

    return value - penaltyStep * (rosterSize - 2);
  }

  private calcEnergy(character: Character, value: number) {
    const characterERBonus = character.calculatorStats.energyRecharge.calc() / 100;
    return value * characterERBonus;
  }

  public reset() {

  }
}
