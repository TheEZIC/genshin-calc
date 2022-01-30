import Skill from "@/Skills/Skill";
import Roster from "@/Roster/Roster";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import NormalSkill from "@/Skills/NormalSkill";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SummonSkill from "@/Skills/SummonSkill";

export interface IOngoingSkill {
  startTime: number;
  skill: Skill;
}

export default class DamageCalculator {
  constructor(
    private roster: Roster,
  ) {
  }

  private elementalReactionManager = new ElementalReactionManager();
  private ongoingSkills: Skill[] = [];

  private onAnySKillStarted(skill: Skill) {
    this.ongoingSkills.push(skill);
  }

  private onAnySkillEnded(skill: Skill) {
    this.ongoingSkills = this.ongoingSkills.filter(s => s.name !== skill.name);
  }

  private subscribeAllCharacters() {
    this.roster.characters.forEach(c => {
      c.skillManager.onAnySkillStarted.subscribe(this.onAnySkillEnded.bind(this));
      c.skillManager.onAnySkillEnded.subscribe(this.onAnySkillEnded.bind(this));
    });
  }

  private unsubscribeAllCharacters() {
    this.roster.characters.forEach(c => {
      c.skillManager.onAnySkillStarted.unsubscribe(this.onAnySkillEnded.bind(this));
      c.skillManager.onAnySkillEnded.unsubscribe(this.onAnySkillEnded.bind(this));
    });
  }

  private delayedActions = [];

  public addDelayedAction() {

  }

  public calcRotation(rotationSkills: Skill[]): number {
    let rotationDmg: number = 0
    let currentFrames: number = 0;
    let rotationFrames: number = 0;
    this.subscribeAllCharacters();

    const logger = [];

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = this.roster.charactersSkills.find((s) => s.skill.name === rotationSkill.name);
      let currentSkillDmg = 0;

      if (!skillItem) continue;
      const {character, skill} = skillItem;

      if (skill.isOnCountdown) {
        continue;
      }

      skill.awake({
        character,
        skills: rotationSkills,
        currentSkillIndex: i,
      });
      skill.start(character);

      const dmgArgs = {
        character,
        skills: rotationSkills,
        currentSkillIndex: i
      }

      logger.push({
        stage: "before",
        name: skill.name,
        rotationDamage: rotationDmg,
        currentFrames,
        rotationFrames,
        buffs: character.ongoingEffects.map(e => e.name),
        parallelSkills: this.ongoingSkills.map(s => s.name),
      })

      if (
        skill instanceof NormalSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Adaptive
      ) {
        for (let frame = 0; frame < skill.frames; frame++) {
          //Calc parallel skills
          this.ongoingSkills.forEach(s => {
            s.update(character);

            if (s instanceof SummonSkill && s.damageRegistrationType === SkillDamageRegistrationType.Adaptive) {
              rotationDmg += s.getDamage(dmgArgs);
            }
          });

          currentFrames++;
          skill.update(character);
          character.ongoingEffects.forEach(e => e.update(character));
          currentSkillDmg += skill.getDamage(dmgArgs);
        }
      } else if (
        skill instanceof NormalSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Snapshot
      ) {
        ///...
      } else if (
        skill instanceof SummonSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Adaptive
      ) {
        for (let frame = 0; frame < skill.summonUsageFrames; frame++) {
          currentFrames++;
          skill.update(character);
          character.ongoingEffects.forEach(e => e.update(character));
        }
      } else if (
        skill instanceof SummonSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Snapshot
      ) {
        for (let frame = 0; frame < skill.summonUsageFrames; frame++) {
          currentFrames++;
          skill.update(character);
          character.ongoingEffects.forEach(e => e.update(character));
        }

        currentSkillDmg += skill.getDamage({...dmgArgs, mvsCalcMode: true});
      }

      rotationDmg += currentSkillDmg;
      rotationFrames += skill.timelineDurationFrames;
      logger.push({
        stage: "after",
        name: skill.name,
        rotationDamage: rotationDmg,
        currentFrames,
        rotationFrames,
        buffs: character.ongoingEffects.map(e => e.name),
        parallelSkills: this.ongoingSkills.map(s => s.name),
      })
    }

    console.table(logger)
    this.unsubscribeAllCharacters();
    return rotationDmg / (rotationFrames / 60);
  }
}
