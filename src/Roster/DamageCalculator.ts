import Skill from "@/Skills/Skill";
import Roster from "@/Roster/Roster";
import NormalSkill from "@/Skills/NormalSkill";
import SummonSkill from "@/Skills/SummonSkill";
import {inject, injectable} from "inversify";
import GlobalListeners, {IOnAnySkill, IOnSkillAction} from "@/Roster/GlobalListeners";
import {rebindAll} from "@/inversify.config";

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

  @inject("GlobalListeners")
  protected globalListeners: GlobalListeners | null = null;

  private ongoingSkills: IOnAnySkill[] = [];

  private onAnySKillStarted(args: IOnAnySkill) {
    this.ongoingSkills.push(args);
  }

  private onAnySkillEnded(args: IOnAnySkill) {
    this.ongoingSkills = this.ongoingSkills.filter(s => s.hash !== args.hash);
  }

  private onAnySKillStartedDelegate = this.onAnySKillStarted.bind(this);
  private onAnySKillEndedDelegate = this.onAnySkillEnded.bind(this);

  private onDamage(args: IOnSkillAction) {
    this.rotationDamage += args.value;
  }

  private onHeal(args: IOnSkillAction) {
  }

  private onCreateShield(args: IOnSkillAction) {
  }

  private onDamageDelegate = this.onDamage.bind(this);
  private onHealDelegate = this.onHeal.bind(this);
  private onCreateShieldDelegate = this.onCreateShield.bind(this)

  private subscribeGlobals() {
    this.globalListeners?.onDamage.subscribe(this.onDamageDelegate);
    this.globalListeners?.onHeal.subscribe(this.onHealDelegate);
    this.globalListeners?.onCreateShield.subscribe(this.onCreateShieldDelegate);

    this.globalListeners?.onSkillStarted.subscribe(this.onAnySKillStartedDelegate);
    this.globalListeners?.onSkillEnded.subscribe(this.onAnySKillEndedDelegate);
  }

  private unsubscribeGlobals() {
    this.globalListeners?.onDamage.unsubscribe(this.onDamageDelegate);
    this.globalListeners?.onHeal.unsubscribe(this.onHealDelegate);
    this.globalListeners?.onCreateShield.unsubscribe(this.onCreateShieldDelegate);

    this.globalListeners?.onSkillStarted.unsubscribe(this.onAnySKillStartedDelegate);
    this.globalListeners?.onSkillEnded.unsubscribe(this.onAnySKillEndedDelegate);
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
    });
  }

  private runDelayedActions() {
    this._delayedActions
      .filter(a => this.currentFrames >= a.startAtFrame)
      .forEach(a => a.run(this));

    this._delayedActions = this._delayedActions.filter(a => this.currentFrames < a.startAtFrame);
  }

  public rotationDamage: number = 0
  private currentFrames: number = 0;

  public get currentFrame(): number {
    return this.currentFrames;
  }

  private rotationSkills: Skill[] = [];
  private currentSkillIndex: number = 0;

  public calcRotation(rotationSkills: Skill[]): number {
    this.subscribeGlobals();

    const logger = [];

    for (let i = 0; i < rotationSkills.length; i++) {
      const rotationSkill = rotationSkills[i];
      const skillItem = this.roster?.charactersSkills.find((s) => s.skill.name === rotationSkill.name);

      if (!skillItem) continue;
      const {character, skill} = skillItem;

      if (skill.countdown.isOnCountdown) {
        continue;
      }

      const hash = skill.name + i;
      const behavior = {hash, character};
      const dmgArgs = {
        character,
        damageCalculator: this,
        skills: rotationSkills,
        currentSkillIndex: i,
        behavior,
      };

      skill.awake(dmgArgs);
      skill.start(behavior);

      logger.push({
        stage: "before",
        name: skill.name,
        rotationDamage: this.rotationDamage,
        currentFrames: this.currentFrames,
        buffs: character.ongoingEffects.map(e => e.name),
        parallelSkills: this.ongoingSkills.map(s => s.skill.name),
      })

      if (skill instanceof NormalSkill) {
        this.skip(skill.frames);
      } else if (skill instanceof SummonSkill) {
        if (skill.skipUsageFrames) {
          this.skip(skill.summonUsageFrames);
        }
      }

      logger.push({
        stage: "after",
        name: skill.name,
        rotationDamage: this.rotationDamage,
        currentFrames: this.currentFrames,
        buffs: character.ongoingEffects.map(e => e.name),
        parallelSkills: this.ongoingSkills.map(s => s.skill.name),
      });
    }


    const framesRemaining = Math.max(...this.ongoingSkills.map(s => s.skill.frames - s.skill.behavior.currentFrame));

    if (framesRemaining !== 0) {
      this.skip(framesRemaining);
      this.currentFrames += framesRemaining;
    }

    console.table(logger);
    this.unsubscribeGlobals();
    const avgDMG =  this.rotationDamage / (this.currentFrames / 60);

    console.log(avgDMG, this.rotationDamage, this.currentFrames);

    rebindAll();

    return avgDMG;
  }

  public skip(frames: number) {
    for (let i = 0; i < frames; i++) {
      this.currentFrames++;
      this.roster?.charactersSkills.forEach(s => s.skill.ICD?.addFrame());
      this.runDelayedActions();

      for (let s of this.ongoingSkills) {
        const skillItem = this.roster!!.charactersSkills.find((a) => a.skill.name === s.skill.name);
        if (skillItem) {
          const dmgArgs = {
            character: s.character,
            damageCalculator: this,
            skills: this.rotationSkills,
            currentSkillIndex: this.currentSkillIndex,
            behavior: {character: s.character, hash: s.hash},
          };

          s.skill.update({hash: s.hash, character: skillItem.character});
          s.skill.doAction(dmgArgs);
        }
      }

      for (let character of this.roster!!.characters) {
        character.ongoingEffects.forEach(e => e.update(character));
      }

      for (let entity of this.roster!!.enemies) {
        entity.ongoingEffects.forEach(e => e.update(entity));
      }
    }
  }

  public reset() {
    this.rotationDamage = 0;
    this.currentFrames = 0;
    this.rotationSkills = [];
    this.ongoingSkills = [];
    this.currentSkillIndex = 0;
  }
}
