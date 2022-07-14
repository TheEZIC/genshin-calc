import "reflect-metadata";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import CrystallizeReaction from "@/ElementalReactions/List/CrystallizeReaction";
import Ayaka from "@/Lists/Charaters/Ayaka/Ayaka";
import Enemy from "@/Entities/Enemies/Enemy";
import GeoStatus from "@/ElementalStatuses/List/GeoStatus";
import PyroStatus from "@/ElementalStatuses/List/PyroStatus";
import DamageCalculator from "@/Roster/DamageCalculator";
import {IElementalReactionManagerArgs} from "@/ElementalReactions/ElementalReaction";
import RefreshManager from "@/Refresher/RefreshManager";
import SingletonsManager from "@/Singletons/SingletonsManager";

const reactionName = "Crystallize";

describe(`${reactionName}Reaction`, () => {
  let damageCalculator: DamageCalculator;

  let character: Ayaka;
  let entity: Enemy;
  let reaction: CrystallizeReaction;
  let elementalStatus: GeoStatus;

  let reactionArgs: IElementalReactionManagerArgs;

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

  afterEach(() => {
    RefreshManager.refreshAll();
    SingletonsManager.resetAll();
  });

  test(`Expect ${reactionName} gauge`, () => {
    damageCalculator.reactionsManager.addStatus(entity, new PyroStatus(1));
    damageCalculator.reactionsManager.applyReaction(reactionArgs);

    const status = entity.getElementalStatus(PyroStatus);

    expect(status).not.toBeUndefined();
    expect(status?.currentFrame).toBe(356);
  });
});
