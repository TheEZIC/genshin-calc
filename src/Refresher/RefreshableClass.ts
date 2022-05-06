import RefreshManager from "@/Refresher/RefreshManager";

export function RefreshableClass(target: any) {
  const original = target;
  // const f : any = function(...args: any[]) {
  //   const obj = new original(...args);
  //   const proto = Object.getPrototypeOf(obj);
  //
  //   for (let prop in obj) {
  //     const refrashable = Reflect.getMetadata("refresh_prop", proto, prop);
  //     if (refrashable !== undefined) {
  //       RefreshManager.add(obj, prop, refrashable);
  //     }
  //   }
  //
  //   return obj;
  // }
  //
  // f.prototype = original.prototype;
  // return f;

  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      const proto = Object.getPrototypeOf(this);

      for (let prop in this) {
        const refrashable = Reflect.getMetadata("refresh_prop", proto, prop);
        if (refrashable !== undefined) {
          RefreshManager.add(this, prop, refrashable);
        }
      }
    }
  } as any
}
