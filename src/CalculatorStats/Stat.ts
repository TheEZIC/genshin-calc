import { StatType } from "@/BaseStats/StatType";
import Character from "@/Entities/Characters/Character";
import { SkillType } from "@/Skills/SkillType";
import {StatTense} from "@/CalculatorStats/StatController";
import Listener from "@/Helpers/Listener";
import Entity from "@/Entities/Entity";

export default abstract class Stat<T extends Entity = Entity> {
  constructor(protected entity: T) {}

  public abstract title: string;

  /**
   * Calc stat value
   * */
  public abstract calc(skillFilter?: SkillType, tenses?: StatTense[]): number;

  /**
   * Calc displayed stat value (like in game)
   * */
  public abstract calcDisplayed(): number;

  /**
   * Calc pure stat value (without prefixes, affixes and additional values)
   * */
  public abstract calcPure(): number;

  public onChange: Listener<number> = new Listener<number>();

  /**
   * Clear this stat
   * */
  public clear(): this {
    return this;
  }
}
