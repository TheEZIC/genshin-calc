import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import CrystallizeReaction from "@/ElementalReactions/List/CrystallizeReaction";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import DamageCalculator from "@/Roster/DamageCalculator";
import {IElementalReactionArgs} from "@/ElementalReactions/ElementalReaction";

const reactionName = "Crystallize";

describe(`${reactionName}Reaction`, () => {
  let damageCalculator: DamageCalculator;

  let character: Ayaka;
  let entity: Enemy;
  let reaction: CrystallizeReaction;
  let elementalStatus: GeoStatus;

  let reactionArgs: IElementalReactionArgs;

  beforeEach(() => {
    damageCalculator = new DamageCalculator();

    character = new Ayaka();
    entity = new Enemy();
    reaction = new CrystallizeReaction(damageCalculator.reactionsManager);
    elementalStatus = new GeoStatus(1);

    damageCalculator.roster.addCharacter(character);
    damageCalculator.roster.addEnemy(entity);

    reactionArgs = {
      damageCalculator,
      character,
      entity,
      elementalStatus,
      damage: 0,
    }
  })

  test(`Expect ${reactionName} dmg`, () => {
    expect(reaction.applyBonusDamage(reactionArgs)).toBe(0);
  });

  test(`Expect ${reactionName} gauge`, () => {
    damageCalculator.reactionsManager.addStatus(entity, new PyroStatus(1));
    damageCalculator.reactionsManager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(356);
  });
});
