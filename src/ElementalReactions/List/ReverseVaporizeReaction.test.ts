import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {StatValue} from "@/CalculatorStats/StatValue";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import ReverseVaporizeReaction from "@/ElementalReactions/List/ReverseVaporizeReaction";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";

const reactionName = "ReverseVaporize";

describe(`${reactionName}Reaction`, () => {
  let character = new Ayaka();
  let entity = new Enemy();

  beforeEach(() => {
    character = new Ayaka();
    entity = new Enemy();
  });

  afterEach(() => {
    RefreshManager.refreshAll();
    SingletonsManager.resetAll();
  });

  let manager: ElementalReactionManager = ElementalReactionManager.instance;
  let reaction = new ReverseVaporizeReaction(manager);

  test(`Expect ${reactionName} dmg`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    const expectedDmg = 1000 * 1.5;
    expect(reaction.applyBonusDamage(reactionArgs)).toBe(expectedDmg);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    const dmgWithoutMS = 1000 * 1.5;
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));
    expect(reaction.applyBonusDamage(reactionArgs)).toBeGreaterThan(dmgWithoutMS);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).not.toBeUndefined();
    expect(status?.currentFrame).toBe(356);

    //aura should exist
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 2`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(713);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 3`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1425);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 4`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(225);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 5`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(450);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 6`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(900);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 7`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(159);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 8`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(319);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });


  test(`Expect ${reactionName} gauge 9`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(638);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 10`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new HydroStatus(1));
    manager.applyReaction(reactionArgs);

    let status = entity.getElementalStatus(HydroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(356);

    //aura should exist
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);

    manager.applyReaction(reactionArgs);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(712);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });
});
