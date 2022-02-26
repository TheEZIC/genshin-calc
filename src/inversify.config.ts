import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";

import Roster from "@/Roster/Roster";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import EnergyManager from "@/Roster/EnergyManager";

const container = new Container();
container.bind<Roster>("Roster").to(Roster).inSingletonScope();
container.bind<DamageCalculator>("DamageCalculator").to(DamageCalculator).inSingletonScope();
container.bind<ElementalReactionManager>("ElementalReactionManager").to(ElementalReactionManager).inSingletonScope();
container.bind<EnergyManager>("EnergyManager").to(EnergyManager).inSingletonScope();

const {lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject} = getDecorators(container);

export {container, lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject};
