export interface IBehavior<T, A = void> {
  start: (args: A) => T;
  update: (args: A) => T;
  end: (args: A) => T;
}
