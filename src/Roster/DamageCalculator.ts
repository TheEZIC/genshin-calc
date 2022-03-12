import Skill from "@/Skills/Skill";
import Roster from "@/Roster/Roster";
import NormalSkill from "@/Skills/NormalSkill";
import {SkillDamageRegistrationType} from "@/Skills/SkillDamageRegistrationType";
import SummonSkill from "@/Skills/SummonSkill";
import Character from "@/Entities/Characters/Character";
import {inject, injectable} from "inversify";

export interface IOngoingSkill {
  startTime: number;
  skill: Skill;
}

export interface IAction {
  delay: number;
  run: (damageCalculator: DamageCalculator) => void;
}

interface IDelayedAction {
  startAtFrame: number;
  run: (damageCalculator: DamageCalculator) => void;
}

@injectable()
export default class DamageCalculator {
  @inject("Roster")
  protected roster: Roster | null = null;

  private ongoingSkills: Skill[] = [];

  private onAnySKillStarted(skill: Skill) {
    this.ongoingSkills.push(skill);
  }

  private onAnySkillEnded(skill: Skill) {
    this.ongoingSkills = this.ongoingSkills.filter(s => s.name !== skill.name);
  }

  private subscribeAllCharacters() {
    this.roster?.characters.forEach(c => {
      c.skillManager.onAnySkillStarted.subscribe(this.onAnySKillStarted.bind(this));
      c.skillManager.onAnySkillEnded.subscribe(this.onAnySkillEnded.bind(this));
    });
  }

  private unsubscribeAllCharacters() {
    this.roster?.characters.forEach(c => {
      c.skillManager.onAnySkillStarted.unsubscribe(this.onAnySKillStarted.bind(this));
      c.skillManager.onAnySkillEnded.unsubscribe(this.onAnySkillEnded.bind(this));
    });
  }

  private _delayedActions: IDelayedAction[] = [];

  public get delayedActions() {
    return this._delayedActions;
  }

  public addAction(newAction: IAction) {
    const {run, delay} = newAction;

    if (newAction.delay === 0) {
      newAction.run(this);
      return;
    }

    this._delayedActions.push({
      startAtFrame: this.currentFrames + delay,
      run,
    })
  }

  private runDelayedActions() {
    this._delayedActions
      .filter(a => this.currentFrames >= a.startAtFrame)
      .forEach(a => a.run(this));

    this._delayedActions = this._delayedActions.filter(a => this.currentFrames < a.startAtFrame);
  }

  public rotationDmg: number = 0
  private currentFrames: number = 0;
  private rotationFrames: number = 0;

  public calcRotation(rotationSkills: Skill[]): number {
    const logger = [];
    this.subscribeAllCharacters();

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = this.roster?.charactersSkills.find((s) => s.skill.name === rotationSkill.name);
      let currentSkillDmg = 0;

      if (!skillItem) continue;
      const {character, skill} = skillItem;

      if (skill.isOnCountdown) {
        continue;
      }

      const dmgArgs = {
        character,
        damageCalculator: this,
        skills: rotationSkills,
        currentSkillIndex: i
      }

      skill.awake(dmgArgs);
      skill.start({character});

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
          this.roster?.charactersSkills.forEach(s => s.skill.ICD?.addFrame());

          //Calc parallel skills
          this.ongoingSkills.forEach(s => {
            s.update({character});

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
        rotationFrames: this.rotationFrames,
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
    skill.update({character});
    this.runDelayedActions();
    character.ongoingEffects.forEach(e => e.update(character));
  }

  public skip(frames: number) {
    for (let i = 0; i < frames; i++) {
      this.currentFrames++;
      this.runDelayedActions();

      for (let skill of this.ongoingSkills) {
        const skillItem = this.roster!!.charactersSkills.find((s) => s.skill.name === skill.name);

        if (skillItem) {
          skill.update({character: skillItem.character});
        }
      }

      for (let character of this.roster!!.characters) {
        character.ongoingEffects.forEach(e => e.update(character));
      }

      for (let entity of this.roster!!.entities) {
        entity.ongoingEffects.forEach(e => e.update(entity));
      }
    }
  }
}
