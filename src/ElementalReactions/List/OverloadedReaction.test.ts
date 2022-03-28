import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import {container} from "@/inversify.config";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import OverloadedReaction from "@/ElementalReactions/List/OverloadedReaction";
import ElectroStatus from "@/ElementalStatuses/List/ElectroStatus";

const reactionName = "Overloaded";

describe(`${reactionName}Reaction`, () => {
  let character = new Ayaka();
  let entity = new Enemy();

  beforeEach(() => {
    character = new Ayaka();
    entity = new Enemy();
  });

  let manager: ElementalReactionManager = container.get("ElementalReactionManager");
  let reaction = new OverloadedReaction(manager);

  test(`Expect ${reactionName} dmg`, () => {
    let elementalStatus = new ElectroStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};
    expect(reaction.applyBonusDamage(reactionArgs)).toBeCloseTo(68.6624221801756);
  });

  test(`Expect ${reactionName} dmg with character lvl`, () => {
    let elementalStatus = new ElectroStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};
    character.baseStats.applyLvl(5);
    expect(reaction.applyBonusDamage(reactionArgs)).toBeCloseTo(90.5815963745116);
  });

  test(`Expect ${reactionName} dmg with MS`, () => {
    let elementalStatus = new ElectroStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};
    character.baseStats.applyLvl(5);
    character.calculatorStats.elementalMastery.additionalValues.add(new StatValue(100));
    expect(reaction.applyBonusDamage(reactionArgs)).toBeGreaterThan(90.5815963745116);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new PyroStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("A1"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(713);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 2`, () => {
    let elementalStatus = new PyroStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("A1"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1425);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 3`, () => {
    let elementalStatus = new PyroStatus("C4");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("A1"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(2850);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 4`, () => {
    let elementalStatus = new PyroStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("B2"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(450);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 5`, () => {
    let elementalStatus = new PyroStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("B2"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(900);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 6`, () => {
    let elementalStatus = new PyroStatus("C4");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("B2"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1800);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 7`, () => {
    let elementalStatus = new PyroStatus("A1");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("C4"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(319);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 8`, () => {
    let elementalStatus = new PyroStatus("B2");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("C4"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(638);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeGreaterThan(status!!.currentFrame);
  });

  test(`Expect ${reactionName} gauge 9`, () => {
    let elementalStatus = new PyroStatus("C4");
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new ElectroStatus("C4"));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(ElectroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(1275);

    //aura shouldn't exist anymore
    expect(status!!.framesDuration).toBeLessThan(status!!.currentFrame);
  });
});
