import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import {container} from "@/inversify.config";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import ReverseMeltReaction from "@/ElementalReactions/List/ReverseMeltReaction";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";

const reactionName = "ReverseMelt";

describe(`${reactionName}Reaction`, () => {
  let character = new Ayaka();
  let entity = new Enemy();

  beforeEach(() => {
    character = new Ayaka();
    entity = new Enemy();
  });

  let manager: ElementalReactionManager = container.get("ElementalReactionManager");
  let reaction = new ReverseMeltReaction(manager);

  test(`Expect ${reactionName} dmg`, () => {
    let elementalStatus = new CryoStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    const expectedDmg = 1000 * 1.5;
    expect(reaction.applyBonusDamage(reactionArgs)).toBe(expectedDmg);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    let elementalStatus = new CryoStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    const dmgWithoutMS = 1000 * 1.5;
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));
    expect(reaction.applyBonusDamage(reactionArgs)).toBeGreaterThan(dmgWithoutMS);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new CryoStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("A1"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).not.toBeUndefined();
    expect(status?.currentFrame).toBe(356);

    //aura should exist
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 2`, () => {
    let elementalStatus = new CryoStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("A1"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(713);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 3`, () => {
    let elementalStatus = new CryoStatus("C4");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("A1"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1425);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 4`, () => {
    let elementalStatus = new CryoStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("B2"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(225);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 5`, () => {
    let elementalStatus = new CryoStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("B2"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(450);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 6`, () => {
    let elementalStatus = new CryoStatus("C4");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("B2"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(900);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 7`, () => {
    let elementalStatus = new CryoStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("C4"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(159);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 8`, () => {
    let elementalStatus = new CryoStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("C4"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(319);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 9`, () => {
    let elementalStatus = new CryoStatus("C4");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("C4"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(638);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 10`, () => {
    let elementalStatus = new CryoStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new PyroStatus("A1"));
    manager.applyReaction(reactionArgs);

    let status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(356);

    //aura should exist
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);

    manager.applyReaction(reactionArgs);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(712);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });
});
