import "reflect-metadata";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import FreezeStatus from "@/ElementalStatuses/List/FreezeStatus";
import DamageCalculator from "@/Roster/DamageCalculator";
import AnemoStatus from "@/ElementalStatuses/List/AnemoStatus";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";

const reactionName = "Frozen";

describe(`${reactionName}Reaction`, () => {
  let damageCalculator: DamageCalculator;
  let character: Ayaka;
  let entity: Enemy;

  beforeEach(() => {
    damageCalculator = new DamageCalculator();
    character = new Ayaka();
    entity = new Enemy();
    damageCalculator.roster.addCharacter(character);
    damageCalculator.roster.addEnemy(entity);
  });

  afterEach(() => {
    RefreshManager.refreshAll();
    SingletonsManager.resetAll();
  });

  test(`Expect ${reactionName} shatter 1`, () => {
    let elementalStatus = new HydroStatus(1);
    let reactionArgs = {
      damageCalculator,
      character,
      entity,
      elementalStatus,
      damage: 1000
    };

    damageCalculator.reactionsManager.addStatus(entity, new CryoStatus(2));
    damageCalculator.reactionsManager.applyReaction(reactionArgs);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    expect(status2).not.toBe(undefined);
  });

  test(`Expect ${reactionName} shatter 2`, () => {
    let elementalStatus = new HydroStatus(1);
    let reactionArgs = {
      damageCalculator,
      character,
      entity,
      elementalStatus,
      damage: 1000
    };

    damageCalculator.reactionsManager.addStatus(entity, new CryoStatus(2));
    damageCalculator.reactionsManager.applyReaction(reactionArgs);
    damageCalculator.reactionsManager.checkShatter(reactionArgs, true);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    expect(status2).toBe(undefined);
  });

  test(`Expect ${reactionName} shatter 3`, () => {
    let elementalStatus1 = new HydroStatus(1);
    let reactionArgs1 = {
      damageCalculator,
      character,
      entity,
      elementalStatus: elementalStatus1,
      damage: 1000
    };

    damageCalculator.reactionsManager.addStatus(entity, new CryoStatus(2));
    damageCalculator.reactionsManager.applyReaction(reactionArgs1);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    let elementalStatus2 = new AnemoStatus(1);
    let reactionArgs2 = {
      damageCalculator,
      character,
      entity,
      elementalStatus: elementalStatus2,
      damage: 1000
    };

    damageCalculator.reactionsManager.checkShatter(reactionArgs2, false);
    damageCalculator.reactionsManager.applyReaction(reactionArgs2);

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
    let reactionArgs1 = {
      damageCalculator,
      character,
      entity,
      elementalStatus: elementalStatus1,
      damage: 1000
    };

    damageCalculator.reactionsManager.addStatus(entity, new CryoStatus(2));
    damageCalculator.reactionsManager.applyReaction(reactionArgs1);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    let elementalStatus2 = new PyroStatus(1);
    let reactionArgs2 = {
      damageCalculator,
      character,
      entity,
      elementalStatus: elementalStatus2,
      damage: 1000
    };

    damageCalculator.reactionsManager.checkShatter(reactionArgs2, false);
    damageCalculator.reactionsManager.applyReaction(reactionArgs2);

    status1 = entity.getElementalStatus(CryoStatus);
    status2 = entity.getElementalStatus(FreezeStatus);

    expect(status1).not.toBeUndefined();
    expect(status1?.currentFrame).not.toBeUndefined();
    expect(status1?.currentFrame).toBe(1350);
    expect(status2?.currentFrame).toBeGreaterThan(status2!!.frames);
  });

  test(`Expect ${reactionName} gauge 1`, () => {
    let elementalStatus = new HydroStatus(1);
    let reactionArgs = {
      damageCalculator,
      character,
      entity,
      elementalStatus,
      damage: 1000
    };

    damageCalculator.reactionsManager.addStatus(entity, new CryoStatus(2));
    damageCalculator.reactionsManager.applyReaction(reactionArgs);

    let status1 = entity.getElementalStatus(CryoStatus);
    let status2 = entity.getElementalStatus(FreezeStatus);

    //skip until end and apply new one
    damageCalculator.skip(210);
    damageCalculator.reactionsManager.applyReaction(reactionArgs);

    status1 = entity.getElementalStatus(CryoStatus);
    status2 = entity.getElementalStatus(FreezeStatus);

    //skip until end and apply new one
    damageCalculator.skip(500);
    damageCalculator.reactionsManager.addStatus(entity, new CryoStatus(2));
    damageCalculator.reactionsManager.applyReaction(reactionArgs);

    status1 = entity.getElementalStatus(CryoStatus);
    status2 = entity.getElementalStatus(FreezeStatus);

    expect(status1).not.toBeUndefined();
    //expect(status1?.currentFrame).toBe(1425);
  });
});
