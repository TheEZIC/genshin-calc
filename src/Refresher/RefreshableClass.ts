import _ from "lodash";
import RefreshManager from "@/Refresher/RefreshManager";

export function RefreshableClass(target: any) {
  const original = target;

  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      const proto = Object.getPrototypeOf(this);

      for (let prop in this) {
        const refreshable = Reflect.getMetadata("refresh_prop", proto, prop);
        if (refreshable !== undefined) {
          RefreshManager.add(this, prop, refreshable === "refresh_prop" ? this[prop] : _.cloneDeep(refreshable));
        }
      }
    }
  } as any
}
