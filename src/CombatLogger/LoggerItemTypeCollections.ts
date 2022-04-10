import {LoggerItemType} from "@/CombatLogger/LoggerItemType";

export const CombatLoggerSkillsCollection: ReadonlyArray<LoggerItemType> = [
  LoggerItemType.SkillStarted,
  LoggerItemType.SkillEnded,
];

export const CombatLoggerEffectsCollection: ReadonlyArray<LoggerItemType> = [
  LoggerItemType.EffectStarted,
  LoggerItemType.EffectReactivate,
  LoggerItemType.EffectEnded,
];

export const CombatLoggerActionsCollection: ReadonlyArray<LoggerItemType> = [
  LoggerItemType.DoDamage,
  LoggerItemType.DoHeal,
  LoggerItemType.CreateShield,
];

export const CombatLoggerReactionsCollection: ReadonlyArray<LoggerItemType> = [
  LoggerItemType.VaporizeReaction,
  LoggerItemType.ReverseVaporizeReaction,
  LoggerItemType.MeltReaction,
  LoggerItemType.ReverseMeltReaction,
  LoggerItemType.OverloadedReaction,
  LoggerItemType.ElectroChargedReaction,
  LoggerItemType.FrozenReaction,
  LoggerItemType.SuperConductReaction,
  LoggerItemType.CrystallizeReaction,
  LoggerItemType.SwirlReaction,
];
