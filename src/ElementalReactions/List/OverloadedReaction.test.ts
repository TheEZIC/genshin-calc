import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {StatValue} from "@/CalculatorStats/StatValue";
import OverloadedReaction from "@/ElementalReactions/List/OverloadedReaction";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";
import DamageCalculator from "@/Roster/DamageCalculator";
import MeltReaction from "@/ElementalReactions/List/MeltReaction";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";

const reactionName = "Overloaded";

describe(`${reactionName}Reaction`, () => {
  let damageCalculator: DamageCalculator;
  let manager: ElementalReactionManager;

  let reaction: OverloadedReaction;

  let character: Ayaka;
  let entity: Enemy;

  beforeEach(() => {
    damageCalculator = new DamageCalculator();
    manager = damageCalculator.reactionsManager;

    reaction = new OverloadedReaction(manager);

    character = new Ayaka();
    entity = new Enemy();

    damageCalculator.roster.addCharacter(character);
    damageCalculator.roster.addEnemy(entity);
  });

  afterEach(() => {
    RefreshManager.refreshAll();
    SingletonsManager.resetAll();
  });

  test(`Expect ${reactionName} dmg`, () => {
    let elementalStatus = new ElectroStatus(1);
    let reactionArgs: IElementalReactionArgs = {
      character,
      source: character,
      entity,
      aura: new PyroStatus(1),
      trigger: elementalStatus,
      damage: 1000,
      damageCalculator,
      ignoreReaction: false,
    };

    expect(reaction.doDamage(reactionArgs)).toBeCloseTo(68.6624221801756);
  });

  test(`Expect ${reactionName} dmg with character lvl`, () => {
    let elementalStatus = new ElectroStatus(1);
    let reactionArgs: IElementalReactionArgs = {
      character,
      source: character,
      entity,
      aura: new PyroStatus(1),
      trigger: elementalStatus,
      damage: 1000,
      damageCalculator,
      ignoreReaction: false,
    };

    character.applyLvl(5);
    expect(reaction.doDamage(reactionArgs)).toBeCloseTo(90.5815963745116);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    let elementalStatus = new ElectroStatus(2);
    let reactionArgs: IElementalReactionArgs = {
      character,
      source: character,
      entity,
      aura: new PyroStatus(1),
      trigger: elementalStatus,
      damage: 1000,
      damageCalculator,
      ignoreReaction: false,
    };

    character.applyLvl(5);
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));
    expect(reaction.doDamage(reactionArgs)).toBeGreaterThan(90.5815963745116);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(713);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 2`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1425);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 3`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(2850);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 4`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(450);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 5`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(900);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 6`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1800);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 7`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(319);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 8`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(638);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 9`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000, damageCalculator};

    manager.addStatus(entity, new ElectroStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1275);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });
});
