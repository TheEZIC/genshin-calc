import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";
import SuperConductReaction from "@/ElementalReactions/List/SuperConductReaction";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";

const reactionName = "SuperConduct";

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
  let reaction = new SuperConductReaction(manager);

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new ElectroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).not.toBeUndefined();
    expect(status?.currentFrame).toBe(713);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 2`, () => {
    let elementalStatus = new ElectroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1425);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 3`, () => {
    let elementalStatus = new ElectroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(2850);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 4`, () => {
    let elementalStatus = new ElectroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(450);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 5`, () => {
    let elementalStatus = new ElectroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(900);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 6`, () => {
    let elementalStatus = new ElectroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1800);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 7`, () => {
    let elementalStatus = new ElectroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(319);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 8`, () => {
    let elementalStatus = new ElectroStatus(2);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(638);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeGreaterThan(status!!.currentFrame);
  });


  test(`Expect ${reactionName} gauge 9`, () => {
    let elementalStatus = new ElectroStatus(4);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(4));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(CryoStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1275);

    //aura shouldn't exist anymore
    expect(status!!.frames).toBeLessThan(status!!.currentFrame);
  });
});
