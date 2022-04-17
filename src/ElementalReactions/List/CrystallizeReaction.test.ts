import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import {container} from "@/inversify.config";
import CrystallizeReaction from "@/ElementalReactions/List/CrystallizeReaction";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";

const reactionName = "Crystallize";

describe(`${reactionName}Reaction`, () => {
  let manager: ElementalReactionManager = container.get("ElementalReactionManager");

  let character = new Ayaka();
  let entity = new Enemy();
  let reaction = new CrystallizeReaction(manager);
  let elementalStatus = new GeoStatus(1);

  let reactionArgs = {
    character,
    entity,
    elementalStatus,
    damage: 0,
  }

  test(`Expect ${reactionName} dmg`, () => {
    expect(reaction.applyBonusDamage(reactionArgs)).toBe(0);
  });

  test(`Expect ${reactionName} gauge`, () => {
    manager.addStatus(entity, new PyroStatus(1));
    manager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(356);
  });
});
