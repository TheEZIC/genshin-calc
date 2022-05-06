import {Constructor} from "@/Helpers/Constructor";

export interface IAbstractFactoryItem<T> {
  item: T;
  creator: Constructor<T>;
}

export default abstract class AbstractFactory<T> {
  protected abstract list: T[];
}
