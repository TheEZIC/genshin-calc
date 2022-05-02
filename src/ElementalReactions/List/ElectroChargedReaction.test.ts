import "reflect-metadata";
import Roster from "@/Roster/Roster";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import ElectroChargedReaction from "@/ElementalReactions/List/ElectroChargedReaction";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";

const reactionName = "ElectroCharged";

describe(`${reactionName}Reaction`, () => {
  afterAll(() => {
    // container.rebind(ContainerBindings.Roster);
    // container.rebind(ContainerBindings.DamageCalculator);
  });

  let roster: Roster = Roster.instance;
  let damageCalculator: DamageCalculator = DamageCalculator.instance;
  let manager: ElementalReactionManager = ElementalReactionManager.instance;

  let character = new Ayaka();
  let entity = new Enemy();
  let reaction = new ElectroChargedReaction(manager);
  let elementalStatus = new ElectroStatus(4);
  let reactionArgs = {character, entity, elementalStatus, damage: 0};

  roster.addCharacter(character);
  roster.addEnemy(entity);

  test(`Expect ${reactionName} dmg`, () => {
    character.baseStats.applyLvl(40);
    let expectedDmg = reaction.baseDamageMultiplier * reaction.calcLvlMultiplier(character);

    expect(reaction.applyBonusDamage(reactionArgs)).toBeCloseTo(expectedDmg);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    character.baseStats.applyLvl(40);
    const dmgWithoutMS = reaction.baseDamageMultiplier * reaction.calcLvlMultiplier(character);
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));
    expect(reaction.applyBonusDamage(reactionArgs)).toBeGreaterThan(dmgWithoutMS);
  });

  test(`Expect ${reactionName} gauge`, () => {
    manager.addStatus(entity, new HydroStatus(4));
    manager.applyReaction(reactionArgs);

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
