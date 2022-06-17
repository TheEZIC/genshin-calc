import "reflect-metadata";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElectroChargedReaction from "@/ElementalReactions/List/ElectroChargedReaction";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

const reactionName = "ElectroCharged";

describe(`${reactionName}Reaction`, () => {
  let damageCalculator: DamageCalculator;

  let reaction: ElectroChargedReaction;
  let elementalStatus: ElectroStatus;

  let character: Ayaka;
  let entity: Enemy;

  let reactionArgs: IElementalReactionArgs;

  beforeEach(() => {
    damageCalculator = new DamageCalculator();

    reaction = new ElectroChargedReaction(damageCalculator.reactionsManager);
    elementalStatus = new ElectroStatus(4);

    character = new Ayaka();
    entity = new Enemy();

    damageCalculator.roster.addCharacter(character);
    damageCalculator.roster.addEnemy(entity);

    reactionArgs = {
      damageCalculator,
      character,
      entity,
      elementalStatus,
      damage: 0
    };
  });

  test(`Expect ${reactionName} dmg`, () => {
    character.applyLvl(40);
    let expectedDmg = reaction.baseDamageMultiplier * reaction.calcLvlMultiplier(character);

    expect(reaction.applyBonusDamage(reactionArgs)).toBeCloseTo(expectedDmg);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    character.applyLvl(40);
    const dmgWithoutMS = reaction.baseDamageMultiplier * reaction.calcLvlMultiplier(character);
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));
    expect(reaction.applyBonusDamage(reactionArgs)).toBeGreaterThan(dmgWithoutMS);
  });

  test(`Expect ${reactionName} gauge`, () => {
    damageCalculator.reactionsManager.addStatus(entity, new HydroStatus(4));
    damageCalculator.reactionsManager.applyReaction(reactionArgs);

    const electroStatus = entity.getElementalStatus(ElectroStatus);
    const hydroStatus = entity.getElementalStatus(HydroStatus)

    expect(electroStatus).not.toBeUndefined();
    expect(hydroStatus).not.toBeUndefined();

    //ticks count
    expect(damageCalculator.delayedActions.length).toBe(6); //one tick is instatility

    expect(electroStatus?.currentFrame).toBe(102);
    expect(hydroStatus?.currentFrame).toBe(102);

    damageCalculator.skip(30);

    expect(electroStatus?.currentFrame).toBe(102 + 30);
    expect(hydroStatus?.currentFrame).toBe(102 + 30);

    damageCalculator.skip(30);

    expect(electroStatus?.currentFrame).toBe(102 * 2 + 60);
    expect(hydroStatus?.currentFrame).toBe(102 * 2+ 60);

    //One tick must be removed
    expect(damageCalculator.delayedActions.length).toBe(5);
  });
});
