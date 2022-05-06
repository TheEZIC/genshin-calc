import {ISingletonWithReset} from "@/Singletons/ISingletonWithReset";

export default class SingletonsManager {
  private static _instance: SingletonsManager | null = null;

  private static _singletons: ISingletonWithReset[] = [];

  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }

    return this._instance;
  }

  public static addSingleton(singleton: ISingletonWithReset) {
    this._singletons.push(singleton);
  }

  public static resetAll() {
    for (let singleton of this._singletons) {
      singleton.reset();
    }
  }
}
