export default abstract class Strategy<T> {
  public abstract execute(params: T): void;
}