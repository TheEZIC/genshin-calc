import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";

import Roster from "@/Roster/Roster";
import DamageCalculator from "@/Roster/DamageCalculator";
import ElementalReactionManager from "@/ElementalReactions/ElementalReactionManager";
import EnergyManager from "@/Roster/EnergyManager";
import GlobalListeners from "@/Roster/GlobalListeners";

enum ContainerBindings {
  Roster= "Roster",
  DamageCalculator = "DamageCalculator",
  ElementalReactionManager = "ElementalReactionManager",
  EnergyManager = "EnergyManager",
  GlobalListeners = "GlobalListeners",
}

interface IReset {
  reset: () => void;
}

const container = new Container();
container.bind<Roster>(ContainerBindings.Roster).to(Roster).inSingletonScope();
container.bind<DamageCalculator>(ContainerBindings.DamageCalculator).to(DamageCalculator).inSingletonScope();
container.bind<ElementalReactionManager>(ContainerBindings.ElementalReactionManager).to(ElementalReactionManager).inSingletonScope();
container.bind<EnergyManager>(ContainerBindings.EnergyManager).to(EnergyManager).inSingletonScope();
container.bind<GlobalListeners>(ContainerBindings.GlobalListeners).to(GlobalListeners).inSingletonScope();

const rebindAll = () => {
  const values = Object.values(ContainerBindings) as string[];

  for (let value of values) {
    const resatable = (container.get(value) as IReset);
    resatable.reset();
  }
}

const {lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject} = getDecorators(container);

export {container, ContainerBindings, lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject, rebindAll};
