import GlobalListeners from "@/Roster/GlobalListeners";
import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";
import SkillStartedLogger from "@/CombatLogger/List/SkillStartedLogger";
import SkillEndedLogger from "@/CombatLogger/List/SkillEndedLogger";
import DamageLogger from "@/CombatLogger/List/Actions/DamageLogger";
import HealLogger from "@/CombatLogger/List/Actions/HealLogger";
import CreateShieldLogger from "@/CombatLogger/List/Actions/CreateShieldLogger";
import EffectStartedLogger from "@/CombatLogger/List/Effects/EffectStartedLogger";
import EffectEndedLogger from "@/CombatLogger/List/Effects/EffectEndedLogger";
import EffectReactivateLogger from "@/CombatLogger/List/Effects/EffectReactivateLogger";
import VaporizeReactionLogger from "@/CombatLogger/List/Reactions/VaporizeReactionLogger";
import ReverseVaporizeReactionLogger from "@/CombatLogger/List/Reactions/ReverseVaporizeReactionLogger";
import MeltReactionLogger from "@/CombatLogger/List/Reactions/MeltReactionLogger";
import ReverseMeltReactionLogger from "@/CombatLogger/List/Reactions/ReverseMeltReactionLogger";
import OverloadedReactionLogger from "@/CombatLogger/List/Reactions/OverloadedReactionLogger";
import ElectroChargedReactionLogger from "@/CombatLogger/List/Reactions/ElectroChargedReactionLogger";
import FrozenReactionLogger from "@/CombatLogger/List/Reactions/FrozenReactionLogger";
import SuperConductReactionLogger from "@/CombatLogger/List/Reactions/SuperConductReactionLogger";
import CrystallizeReactionLogger from "@/CombatLogger/List/Reactions/CrystallizeReactionLogger";
import SwirlReactionLogger from "@/CombatLogger/List/Reactions/SwirlReactionLogger";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import VaporizeReaction from "@/ElementalReactions/List/VaporizeReaction";
import ReverseVaporizeReaction from "@/ElementalReactions/List/ReverseVaporizeReaction";
import MeltReaction from "@/ElementalReactions/List/MeltReaction";
import ReverseMeltReaction from "@/ElementalReactions/List/ReverseMeltReaction";
import OverloadedReaction from "@/ElementalReactions/List/OverloadedReaction";
import ElectroChargedReaction from "@/ElementalReactions/List/ElectroChargedReaction";
import FrozenReaction from "@/ElementalReactions/List/FrozenReaction";
import SuperConductReaction from "@/ElementalReactions/List/SuperConductReaction";
import CrystallizeReaction from "@/ElementalReactions/List/CrystallizeReaction";
import SwirlReaction from "@/ElementalReactions/List/SwirlReaction";
import EffectRefillLogger from "@/CombatLogger/List/Effects/EffectRefillLogger";
import DamageCalculator from "@/Roster/DamageCalculator";

interface ICombatLogItem {
  type: LoggerItemType,
  logItem: ILogItem;
}

export default class CombatLogger {
  constructor(
    public damageCalculator: DamageCalculator,
  ) {
    this.subscribeSkillEvents();
    this.subscribeEffectEvents();
    this.subscribeActionEvents();
    this.subscribeReactionEvents();
  }

  private _logs: ICombatLogItem[] = [];

  public addLog(logItem: ILogItem, type: LoggerItemType) {
    this._logs.push({type, logItem});
  }

  get logs() {
    return this._logs.map(l => l.logItem);
  }

  public getFilteredLogs(types: LoggerItemType[]) {
    if (!types.length) return this.logs;

    return this._logs
      .filter(l => types.includes(l.type))
      .map(l => l.logItem);
  }

  public clear() {
    this._logs = [];
  }

  public toJSON(): string {
    return JSON.stringify(this._logs);
  }

  public getLoggerByType<T extends LoggerItem<ILogItem, any>>(type: LoggerItemType): T {
    return this.loggers.find(l => l.type === type)!! as T;
  }

  private loggers: LoggerItem<ILogItem, any>[] = [
    new SkillStartedLogger(this),
    new SkillEndedLogger(this),

    new EffectStartedLogger(this),
    new EffectRefillLogger(this),
    new EffectReactivateLogger(this),
    new EffectEndedLogger(this),

    new DamageLogger(this),
    new HealLogger(this),
    new CreateShieldLogger(this),

    new VaporizeReactionLogger(this),
    new ReverseVaporizeReactionLogger(this),
    new MeltReactionLogger(this),
    new ReverseMeltReactionLogger(this),
    new OverloadedReactionLogger(this),
    new ElectroChargedReactionLogger(this),
    new FrozenReactionLogger(this),
    new SuperConductReactionLogger(this),
    new CrystallizeReactionLogger(this),
    new SwirlReactionLogger(this),
  ];

  private subscribeSkillEvents() {
    const startedLogger = this.getLoggerByType<SkillStartedLogger>(LoggerItemType.SkillStarted);
    const endedLogger = this.getLoggerByType<SkillEndedLogger>(LoggerItemType.SkillEnded);

    this.damageCalculator.globalListeners.onSkillStarted.subscribe(startedLogger.log.bind(startedLogger));
    this.damageCalculator.globalListeners.onSkillEnded.subscribe(endedLogger.log.bind(endedLogger));
  }

  private subscribeEffectEvents() {
    const startedLogger = this.getLoggerByType<EffectStartedLogger>(LoggerItemType.EffectStarted);
    const reactivateLogger = this.getLoggerByType<EffectReactivateLogger>(LoggerItemType.EffectReactivate);
    const refillLogger = this.getLoggerByType<EffectReactivateLogger>(LoggerItemType.EffectRefill);
    const endedLogger = this.getLoggerByType<EffectEndedLogger>(LoggerItemType.EffectEnded);

    this.damageCalculator.globalListeners.onEffectStarted.subscribe(startedLogger.log.bind(startedLogger));
    this.damageCalculator.globalListeners.onEffectReactivate.subscribe(reactivateLogger.log.bind(reactivateLogger));
    this.damageCalculator.globalListeners.onEffectRefill.subscribe(refillLogger.log.bind(refillLogger));
    this.damageCalculator.globalListeners.onEffectEnded.subscribe(endedLogger.log.bind(endedLogger));
  }

  private subscribeActionEvents() {
    const damageLogger = this.getLoggerByType<DamageLogger>(LoggerItemType.DoDamage);
    const healLogger = this.getLoggerByType<HealLogger>(LoggerItemType.DoHeal);
    const createShieldLogger = this.getLoggerByType<CreateShieldLogger>(LoggerItemType.CreateShield);

    this.damageCalculator.globalListeners.onDamage.subscribe(damageLogger.log.bind(damageLogger));
    this.damageCalculator.globalListeners.onHeal.subscribe(healLogger.log.bind(healLogger));
    this.damageCalculator.globalListeners.onCreateShield.subscribe(createShieldLogger.log.bind(createShieldLogger));
  }

  private subscribeReactionEvents() {
    const vaporizeLogger = this.getLoggerByType<VaporizeReactionLogger>(LoggerItemType.VaporizeReaction);
    const reverseVaporizeLogger = this.getLoggerByType<ReverseVaporizeReactionLogger>(LoggerItemType.ReverseVaporizeReaction);
    const meltLogger = this.getLoggerByType<MeltReactionLogger>(LoggerItemType.MeltReaction);
    const reverseMeltLogger = this.getLoggerByType<ReverseMeltReactionLogger>(LoggerItemType.ReverseMeltReaction);
    const overloadLogger = this.getLoggerByType<OverloadedReactionLogger>(LoggerItemType.OverloadedReaction);
    const electroChargedLogger = this.getLoggerByType<ElectroChargedReactionLogger>(LoggerItemType.ElectroChargedReaction);
    const frozenLogger = this.getLoggerByType<FrozenReactionLogger>(LoggerItemType.FrozenReaction);
    const superConductLogger = this.getLoggerByType<SuperConductReactionLogger>(LoggerItemType.SuperConductReaction);
    const crystallizeLogger = this.getLoggerByType<CrystallizeReactionLogger>(LoggerItemType.CrystallizeReaction);
    const swirlLogger = this.getLoggerByType<SwirlReactionLogger>(LoggerItemType.SwirlReaction);

    this.damageCalculator.reactionsManager
      .getReaction(VaporizeReaction)?.onExecuteListener
      .subscribe(vaporizeLogger.log.bind(vaporizeLogger));

    this.damageCalculator.reactionsManager
      .getReaction(ReverseVaporizeReaction)?.onExecuteListener
      .subscribe(reverseVaporizeLogger.log.bind(reverseVaporizeLogger));

    this.damageCalculator.reactionsManager
      .getReaction(MeltReaction)?.onExecuteListener
      .subscribe(meltLogger.log.bind(meltLogger));

    this.damageCalculator.reactionsManager
      .getReaction(ReverseMeltReaction)?.onExecuteListener
      .subscribe(reverseMeltLogger.log.bind(reverseMeltLogger));

    this.damageCalculator.reactionsManager
      .getReaction(OverloadedReaction)?.onExecuteListener
      .subscribe(overloadLogger.log.bind(overloadLogger));

    this.damageCalculator.reactionsManager
      .getReaction(ElectroChargedReaction)?.onExecuteListener
      .subscribe(electroChargedLogger.log.bind(electroChargedLogger));

    this.damageCalculator.reactionsManager
      .getReaction(FrozenReaction)?.onExecuteListener
      .subscribe(frozenLogger.log.bind(frozenLogger));

    this.damageCalculator.reactionsManager
      .getReaction(SuperConductReaction)?.onExecuteListener
      .subscribe(superConductLogger.log.bind(superConductLogger));

    this.damageCalculator.reactionsManager
      .getReaction(CrystallizeReaction)?.onExecuteListener
      .subscribe(crystallizeLogger.log.bind(crystallizeLogger));

    this.damageCalculator.reactionsManager
      .getReaction(SwirlReaction)?.onExecuteListener
      .subscribe(swirlLogger.log.bind(swirlLogger));
  }

  public async save(): Promise<void> {
    // if (isNode) {
    //   const fs = await import(isNode ? "fs" : "");
    //   const content = JSON.stringify(this._logs, null, 2);
    //
    //   if (!fs.existsSync("./logs")) {
    //     fs.mkdirSync("./logs");
    //   }
    //
    //   const date = new Date();
    //   const dateFull = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    //   const dateTime = `${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}`;
    //
    //   const fileName = `log [${dateFull} ${dateTime}]`;
    //
    //   fs.writeFileSync(`./logs/${fileName}.json`, content);
    // }
  }
}
