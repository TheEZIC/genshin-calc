import Skill from "@/Skills/Skill";
import Roster from "@/Roster/Roster";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import NormalSkill from "@/Skills/NormalSkill";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SummonSkill from "@/Skills/SummonSkill";
import Character from "@/Characters/Character";

export interface IOngoingSkill {
  startTime: number;
  skill: Skill;
}

export interface IAction {
  delay: number;
  run: () => void;
}

interface IDelayedAction {
  startAtFrame: number;
  run: () => void;
}

export default class DamageCalculator {
  constructor(
    public roster: Roster,
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

  private delayedActions: IDelayedAction[] = [];

  public addAction(newAction: IAction) {
    const {run, delay} = newAction;

    this.delayedActions.push({
      startAtFrame: this.currentFrames + delay,
      run,
    })
  }

  private runDelayedActions() {
    for (let action of this.delayedActions) {
      if (this.currentFrames === action.startAtFrame) {
        action.run();
      }
    }
  }

  private rotationDmg: number = 0
  private currentFrames: number = 0;
  private rotationFrames: number = 0;

  public calcRotation(rotationSkills: Skill[]): number {
    const logger = [];
    this.subscribeAllCharacters();

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
      skill.start(character, this);

      const dmgArgs = {
        character,
        skills: rotationSkills,
        currentSkillIndex: i
      }

      logger.push({
        stage: "before",
        name: skill.name,
        rotationDamage: this.rotationDmg,
        currentFrames: this.currentFrames,
        rotationFrames: this.rotationFrames,
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
            s.update(character, this);

            if (s instanceof SummonSkill && s.damageRegistrationType === SkillDamageRegistrationType.Adaptive) {
              this.rotationDmg += s.getDamage(dmgArgs);
            }
          });

          this.runDefaultSkill(skill, character);
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
          this.runDefaultSkill(skill, character);
        }
      } else if (
        skill instanceof SummonSkill
        && skill.damageRegistrationType === SkillDamageRegistrationType.Snapshot
      ) {
        for (let frame = 0; frame < skill.summonUsageFrames; frame++) {
          this.runDefaultSkill(skill, character);
        }

        currentSkillDmg += skill.getDamage({...dmgArgs, mvsCalcMode: true});
      }

      this.rotationDmg += currentSkillDmg;
      this.rotationFrames += skill.timelineDurationFrames;
      logger.push({
        stage: "after",
        name: skill.name,
        rotationDamage: this.rotationDmg,
        currentFrames: this.currentFrames,
        rotationFrames: this.rotationDmg,
        buffs: character.ongoingEffects.map(e => e.name),
        parallelSkills: this.ongoingSkills.map(s => s.name),
      })
    }

    console.table(logger);
    this.unsubscribeAllCharacters();
    const avgDMG =  this.rotationDmg / (this.rotationFrames / 60);

    this.rotationDmg = 0;
    this.currentFrames = 0;
    this.rotationFrames = 0;

    return avgDMG;
  }

  private runDefaultSkill(skill: Skill, character: Character) {
    this.currentFrames++;
    skill.update(character, this);
    this.runDelayedActions();
    character.ongoingEffects.forEach(e => e.update(character));
  }
}
