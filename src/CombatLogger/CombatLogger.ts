import GlobalListeners from "@/Roster/GlobalListeners";
import {container, ContainerBindings} from "@/inversify.config";
import LoggerItem, {ILogItem, LoggerItemType} from "@/CombatLogger/LoggerItem";
import SkillStartedLogger from "@/CombatLogger/List/SkillStartedLogger";
import SkillEndedLogger from "@/CombatLogger/List/SkillEndedLogger";
import DamageLogger from "@/CombatLogger/List/DamageLogger";
import HealLogger from "@/CombatLogger/List/HealLogger";
import CreateShieldLogger from "@/CombatLogger/List/CreateShieldLogger";
import EffectStartedLogger from "@/CombatLogger/List/EffectStartedLogger";
import EffectEndedLogger from "@/CombatLogger/List/EffectEndedLogger";
import EffectReactivateLogger from "@/CombatLogger/List/EffectReactivateLogger";

export default class CombatLogger {
  constructor() {
    this.subscribeSkillsEvents();
    this.subscribeEffectsEvents();
    this.subscribeActionEvents();
  }

  private globalListeners: GlobalListeners = container.get<GlobalListeners>(ContainerBindings.GlobalListeners);
  private _logs: ILogItem[] = [];

  public addLog(logItem: ILogItem) {
    this._logs.push(logItem);
  }

  get logs() {
    return this._logs;
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
  ];

  private subscribeSkillsEvents() {
    const startedLogger = this.getLoggerByType<SkillStartedLogger>(LoggerItemType.SkillStarted);
    const endedLogger = this.getLoggerByType<SkillEndedLogger>(LoggerItemType.SkillEnded);

    this.globalListeners.onSkillStarted.subscribeWithProxy(startedLogger.log.bind(startedLogger));
    this.globalListeners.onSkillEnded.subscribeWithProxy(endedLogger.log.bind(endedLogger));
  }

  private subscribeEffectsEvents() {
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
}
