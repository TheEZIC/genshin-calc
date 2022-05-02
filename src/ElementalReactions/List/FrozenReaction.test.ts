import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import FreezeStatus from "@/ElementalStatuses/List/FreezeStatus";
import DamageCalculator from "@/Roster/DamageCalculator";
import Roster from "@/Roster/Roster";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";

const reactionName = "Frozen";

describe(`${reactionName}Reaction`, () => {
  afterAll(() => {
    // container.rebind(ContainerBindings.Roster);
    // container.rebind(ContainerBindings.DamageCalculator);
  });

  let character = new Ayaka();
  let entity = new Enemy();

  let roster: Roster = Roster.instance;
  let damageCalculator: DamageCalculator = DamageCalculator.instance;
  let manager: ElementalReactionManager = ElementalReactionManager.instance;

  beforeEach(() => {
    character = new Ayaka();
    entity = new Enemy();
    roster.addCharacter(character);
    roster.addEnemy(entity);
  });

  test(`Expect ${reactionName} shatter 1`, () => {
    let elementalStatus = new HydroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    expect(status2).not.toBe(undefined);
  });

  test(`Expect ${reactionName} shatter 2`, () => {
    let elementalStatus = new HydroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);
    manager.checkShatter(reactionArgs, true);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    expect(status2).toBe(undefined);
  });

  test(`Expect ${reactionName} shatter 3`, () => {
    let elementalStatus1 = new HydroStatus(1);
    let reactionArgs1 = {character, entity, elementalStatus: elementalStatus1, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs1);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    let elementalStatus2 = new AnemoStatus(1);
    let reactionArgs2 = {character, entity, elementalStatus: elementalStatus2, damage: 1000};

    manager.checkShatter(reactionArgs2, false);
    manager.applyReaction(reactionArgs2);

    status1 = entity.getElementalStatus(CryoStatus);
    status2 = entity.getElementalStatus(FreezeStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(675);
    expect(status2).not.toBe(undefined);
    expect(status2?.currentFrame).not.toBeUndefined();
    expect(status2?.currentFrame).toBe(65);
  });

  test(`Expect ${reactionName} shatter 4`, () => {
    let elementalStatus1 = new HydroStatus(1);
    let reactionArgs1 = {character, entity, elementalStatus: elementalStatus1, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs1);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    let elementalStatus2 = new PyroStatus(1);
    let reactionArgs2 = {character, entity, elementalStatus: elementalStatus2, damage: 1000};

    manager.checkShatter(reactionArgs2, false);
    manager.applyReaction(reactionArgs2);

    status1 = entity.getElementalStatus(CryoStatus);
    status2 = entity.getElementalStatus(FreezeStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(1350);
    expect(status2?.currentFrame).toBeGreaterThan(status2!!.framesDuration);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new HydroStatus(1);
    let reactionArgs = {character, entity, elementalStatus, damage: 1000};

    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    //skip until end and apply new one
    damageCalculator.skip(210);
    manager.applyReaction(reactionArgs);

    status1 = entity.getElementalStatus(CryoStatus);
    status2 = entity.getElementalStatus(FreezeStatus);

    //skip until end and apply new one
    damageCalculator.skip(500);
    manager.addStatus(entity, new CryoStatus(2));
    manager.applyReaction(reactionArgs);

    status1 = entity.getElementalStatus(CryoStatus);
    status2 = entity.getElementalStatus(FreezeStatus);

    expect(status1).not.toBeUndefined();
    //expect(status1?.currentFrame).toBe(1425);
  });
});
