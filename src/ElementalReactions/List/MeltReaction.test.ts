import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import MeltReaction from "@/ElementalReactions/List/MeltReaction";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";

const reactionName = "Melt";

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
  let reaction = new MeltReaction(manager);

  test(`Expect ${reactionName} dmg`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    const expectedDmg = 1000 * 2;
    expect(reaction.applyBonusDamage(reactionArgs)).toBe(expectedDmg);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    const dmgWithoutMS = 1000 * 2;
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));
    expect(reaction.applyBonusDamage(reactionArgs)).toBeGreaterThan(dmgWithoutMS);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1425);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 2`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(2850);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 3`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(5700);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 4`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).not.toBeUndefined();
    expect(status?.currentFrame).toBe(900);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 5`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1800);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 6`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).not.toBeUndefined();
    expect(status?.currentFrame).toBe(3600);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 7`, () => {
    let elementalStatus = new PyroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(638);

    //aura should exist
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 8`, () => {
    let elementalStatus = new PyroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1275);

    //aura should exist
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 9`, () => {
    let elementalStatus = new PyroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(2550);

    //aura should exist
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });
});
