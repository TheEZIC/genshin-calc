import ShieldEffect from "@/Effects/ShieldEffect";
import Character from "@/Entities/Characters/Character";
import {SkillType} from "@/Skills/SkillType";
import NoelleElemental from "@/Lists/Charaters/Noelle/NoelleElemental";
import CombatActions, {ICombatDamageArgs, ICombatHealArgs} from "../../../../../Skills/CombatActions";

export default class NoelleShield extends ShieldEffect<Character> {
  frames: number = 20 * 60;

  private onAttack(args: ICombatDamageArgs) {
    const {character} = args;
    const {damageCalculator} = character;
    const combat = new CombatActions(damageCalculator);
    const elementalSkill = character.skillManager.getSkillByType(SkillType.Elemental) as NoelleElemental;
    const def = character.calculatorStats.DEF.calc(elementalSkill.strategy.type);

    const healing: number =
      elementalSkill.healValue.getValue(elementalSkill.lvl.current)
      * elementalSkill.healChangeValue.getValue(elementalSkill.lvl.current)
      * def;

    for (let target of damageCalculator.roster.characters) {
      const healArgs: ICombatHealArgs = {
        character,
        source: elementalSkill,
        target,
        comment: "Noelle hit",
        value: healing,
      }

      combat.doHeal(healArgs);
    }
  }

  private onAttackDelegate = this.onAttack.bind(this);

  protected applyEffect(entity: Character): void {
    entity.listeners.NormalAttackDamage.subscribe(
      this.onAttackDelegate,
    )
  }

  protected removeEffect(entity: Character): void {
    entity.listeners.NormalAttackDamage.unsubscribe(
      this.onAttackDelegate,
    )
  }
}
