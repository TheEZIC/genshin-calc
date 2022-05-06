export function RefreshableProperty<T = any>(value?: T) {
  return function (target: Object, propertyKey: string) {
    Reflect.defineMetadata("refresh_prop", value ?? null, target, propertyKey);
  }
}
