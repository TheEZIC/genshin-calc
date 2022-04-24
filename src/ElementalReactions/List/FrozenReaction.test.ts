import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import {container, ContainerBindings} from "@/inversify.config";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import {StatValue} from "@/Entities/Characters/CalculatorStats/Types/StatValue";
import MeltReaction from "@/ElementalReactions/List/MeltReaction";
import CryoStatus from "@/ElementalStatuses/List/CryoStatus";
import FrozenReaction from "@/ElementalReactions/List/FrozenReaction";
import HydroStatus from "@/ElementalStatuses/List/HydroStatus";
import FreezeStatus from "@/ElementalStatuses/List/FreezeStatus";
import DamageCalculator from "@/Roster/DamageCalculator";
import Roster from "@/Roster/Roster";

const reactionName = "Melt";

describe(`${reactionName}Reaction`, () => {
  afterAll(() => {
    container.rebind(ContainerBindings.Roster);
    container.rebind(ContainerBindings.DamageCalculator);
  });

  let character = new Ayaka();
  let entity = new Enemy();

  let roster: Roster = container.get(ContainerBindings.Roster);
  let damageCalculator: DamageCalculator = container.get(ContainerBindings.DamageCalculator);
  let manager: ElementalReactionManager = container.get("ElementalReactionManager");

  beforeEach(() => {
    character = new Ayaka();
    entity = new Enemy();
    roster.addCharacter(character);
    roster.addEnemy(entity);
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
