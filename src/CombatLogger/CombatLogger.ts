import GlobalListeners from "@/Roster/GlobalListeners";
import LoggerItem, {ILogItem} from "@/CombatLogger/LoggerItem";
import {LoggerItemType} from "@/CombatLogger/LoggerItemType";
import SkillStartedLogger from "@/CombatLogger/List/SkillStartedLogger";
import SkillEndedLogger from "@/CombatLogger/List/SkillEndedLogger";
import DamageLogger from "@/CombatLogger/List/Actions/DamageLogger";
import HealLogger from "@/CombatLogger/List/Actions/HealLogger";
import CreateShieldLogger from "@/CombatLogger/List/Actions/CreateShieldLogger";
import EffectStartedLogger from "@/CombatLogger/List/EffectStartedLogger";
import EffectEndedLogger from "@/CombatLogger/List/EffectEndedLogger";
import EffectReactivateLogger from "@/CombatLogger/List/EffectReactivateLogger";
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

interface ICombatLogItem {
  type: LoggerItemType,
  logItem: ILogItem;
}

export default class CombatLogger {
  constructor() {
    this.subscribeSkillEvents();
    this.subscribeEffectEvents();
    this.subscribeActionEvents();
    this.subscribeReactionEvents();
  }

  private globalListeners: GlobalListeners = GlobalListeners.instance;
  private reactionManager: ElementalReactionManager = ElementalReactionManager.instance;
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

    this.globalListeners.onSkillStarted.subscribeWithProxy(startedLogger.log.bind(startedLogger));
    this.globalListeners.onSkillEnded.subscribeWithProxy(endedLogger.log.bind(endedLogger));
  }

  private subscribeEffectEvents() {
    const startedLogger = this.getLoggerByType<EffectStartedLogger>(LoggerItemType.EffectStarted);
    const reactivateLogger = this.getLoggerByType<EffectReactivateLogger>(LoggerItemType.EffectReactivate);
    const endedLogger = this.getLoggerByType<EffectEndedLogger>(LoggerItemType.EffectEnded);

    this.globalListeners.onEffectStarted.subscribeWithProxy(startedLogger.log.bind(startedLogger));
    this.globalListeners.onEffectReactivate.subscribeWithProxy(reactivateLogger.log.bind(reactivateLogger));
    this.globalListeners.onEffectEnded.subscribeWithProxy(endedLogger.log.bind(endedLogger));
  }

  private subscribeActionEvents() {
    const damageLogger = this.getLoggerByType<DamageLogger>(LoggerItemType.DoDamage);
    const healLogger = this.getLoggerByType<HealLogger>(LoggerItemType.DoHeal);
    const createShieldLogger = this.getLoggerByType<CreateShieldLogger>(LoggerItemType.CreateShield);

    this.globalListeners.onDamage.subscribeWithProxy(damageLogger.log.bind(damageLogger));
    this.globalListeners.onHeal.subscribeWithProxy(healLogger.log.bind(healLogger));
    this.globalListeners.onCreateShield.subscribeWithProxy(createShieldLogger.log.bind(createShieldLogger));
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

    this.reactionManager.getReaction(VaporizeReaction)?.onExecuteListener
      .subscribeWithProxy(vaporizeLogger.log.bind(vaporizeLogger));
    this.reactionManager.getReaction(ReverseVaporizeReaction)?.onExecuteListener
      .subscribeWithProxy(reverseVaporizeLogger.log.bind(reverseVaporizeLogger));
    this.reactionManager.getReaction(MeltReaction)?.onExecuteListener
      .subscribeWithProxy(meltLogger.log.bind(meltLogger));
    this.reactionManager.getReaction(ReverseMeltReaction)?.onExecuteListener
      .subscribeWithProxy(reverseMeltLogger.log.bind(reverseMeltLogger));
    this.reactionManager.getReaction(OverloadedReaction)?.onExecuteListener
      .subscribeWithProxy(overloadLogger.log.bind(overloadLogger));
    this.reactionManager.getReaction(ElectroChargedReaction)?.onExecuteListener
      .subscribeWithProxy(electroChargedLogger.log.bind(electroChargedLogger));
    this.reactionManager.getReaction(FrozenReaction)?.onExecuteListener
      .subscribeWithProxy(frozenLogger.log.bind(frozenLogger));
    this.reactionManager.getReaction(SuperConductReaction)?.onExecuteListener
      .subscribeWithProxy(superConductLogger.log.bind(superConductLogger));
    this.reactionManager.getReaction(CrystallizeReaction)?.onExecuteListener
      .subscribeWithProxy(crystallizeLogger.log.bind(crystallizeLogger));
    this.reactionManager.getReaction(SwirlReaction)?.onExecuteListener
      .subscribeWithProxy(swirlLogger.log.bind(swirlLogger));
  }
}
