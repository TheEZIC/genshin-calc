import {Constructor} from "@/Helpers/Constructor";

export interface IWithCreator<T = any> {
  creator: Constructor<T>;
}
