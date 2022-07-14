import "reflect-metadata";
import Roster from "@/Roster/Roster";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import {StatValue} from "@/CalculatorStats/StatValue";
import SwirlReaction from "@/ElementalReactions/List/SwirlReaction";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";
import ReverseMeltReaction from "@/ElementalReactions/List/ReverseMeltReaction";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";

const reactionName = "Swirl";

describe(`${reactionName}Reaction`, () => {
  let damageCalculator: DamageCalculator;
  let manager: ElementalReactionManager;

  let reaction: SwirlReaction;

  let character: Ayaka;
  let entity1: Enemy;
  let entity2: Enemy;

  beforeEach(() => {
    damageCalculator = new DamageCalculator();
    manager = damageCalculator.reactionsManager;

    reaction = new SwirlReaction(manager);

    character = new Ayaka();
    entity1 = new Enemy();
    entity2 = new Enemy();

    damageCalculator.roster.addCharacter(character);
    damageCalculator.roster.addEnemy(entity1);
    damageCalculator.roster.addEnemy(entity2);
  });

  afterEach(() => {
    RefreshManager.refreshAll();
    SingletonsManager.resetAll();
  });

  test(`Expect ${reactionName} dmg`, () => {
    let elementalStatus = new AnemoStatus(4);
    let reactionArgs: IElementalReactionArgs = {
      character,
      source: character,
      entity: entity1,
      aura: new CryoStatus(1),
      trigger: elementalStatus,
      damage: 1000,
      damageCalculator,
      ignoreReaction: false,
    };

    character.applyLvl(40);
    let expectedDmg = reaction.baseDamageMultiplier * reaction.calcLvlMultiplier(character);

    expect(reaction.doDamage(reactionArgs)).toBeCloseTo(expectedDmg);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    let elementalStatus = new AnemoStatus(1);
    let reactionArgs: IElementalReactionArgs = {
      character,
      source: character,
      entity: entity1,
      aura: new CryoStatus(1),
      trigger: elementalStatus,
      damage: 1000,
      damageCalculator,
      ignoreReaction: false,
    };

    character.applyLvl(40);
    const dmgWithoutMS = reaction.baseDamageMultiplier * reaction.calcLvlMultiplier(character);
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));

    expect(reaction.doDamage(reactionArgs)).toBeGreaterThan(dmgWithoutMS);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new AnemoStatus(1);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(1));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(356);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(2.2);
  });

  test(`Expect ${reactionName} gauge 2`, () => {
    let elementalStatus = new AnemoStatus(2);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(1));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(713);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(3.45);
  });

  test(`Expect ${reactionName} gauge 3`, () => {
    let elementalStatus = new AnemoStatus(4);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(1));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(1425);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(2.2);
  });

  test(`Expect ${reactionName} gauge 4`, () => {
    let elementalStatus = new AnemoStatus(1);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(2));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(225);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(2.2);
  });

  test(`Expect ${reactionName} gauge 5`, () => {
    let elementalStatus = new AnemoStatus(2);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(2));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(450);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(3.45);
  });

  test(`Expect ${reactionName} gauge 6`, () => {
    let elementalStatus = new AnemoStatus(4);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(2));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(900);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(5.95);
  });

  test(`Expect ${reactionName} gauge 7`, () => {
    let elementalStatus = new AnemoStatus(1);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(4));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(159);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(2.2);
  });

  test(`Expect ${reactionName} gauge 8`, () => {
    let elementalStatus = new AnemoStatus(2);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(4));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(319);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(3.45);
  });

  test(`Expect ${reactionName} gauge 9`, () => {
    let elementalStatus = new AnemoStatus(4);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(4));
    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(638);

    const status2 = entity2.getElementalStatus(PyroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.units).not.toBeUndefined();
    expect(status2?.units).toBeCloseTo(5.95);
  });

  test(`Expect ${reactionName} multitarget gauge 1`, () => {
    let elementalStatus = new AnemoStatus(1);
    let reactionArgs = {character, entity: entity1, elementalStatus, damage: 0, damageCalculator};

    manager.addStatus(entity1, new PyroStatus(1));
    manager.addStatus(entity2, new ElectroStatus(4));

    manager.applyReaction(reactionArgs);

    const status1 = entity1.getElementalStatus(PyroStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(356);

    const status2 = entity2.getElementalStatus(ElectroStatus);

    expect(status2).not.toBeUndefined();
    expect(status2?.currentFrame).not.toBeUndefined();
    expect(status2?.currentFrame).toBe(701);
  });
});
