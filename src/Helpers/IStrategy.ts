export default interface IStrategy<T = undefined | null> {
  execute: (params?: T) => void;
}