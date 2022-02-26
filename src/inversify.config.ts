import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";

import Roster from "@/Roster/Roster";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";

const Types = {
  Roster: "Roster",
  DamageCalculator: "DamageCalculator",
  ElementalReactionManager: "ElementalReactionManager",
}

const container = new Container();
container.bind<Roster>(Types.Roster).to(Roster).inSingletonScope();
container.bind<DamageCalculator>(Types.DamageCalculator).to(DamageCalculator).inSingletonScope();
container.bind<ElementalReactionManager>(Types.ElementalReactionManager).to(ElementalReactionManager).inSingletonScope();

const {lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject} = getDecorators(container);

export {container, Types, lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject};
