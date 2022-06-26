export interface ISubscriber<SubscriberArgs = void> {
  runOnEvent(args: SubscriberArgs): void;
}

export type Subscriber<SubscriberArgs = void> = (args: SubscriberArgs) => void;

export interface ProxyEvent<SubscriberArgs = void> {
  startFrame: number;
  args: SubscriberArgs;
}

type SubscriberArgs<T> = Subscriber<T> | ISubscriber<T>;

export default class Listener<T = void> {
  private subscribers: Array<SubscriberArgs<T>> = [];

  private addToList<T>(list: T[], subscriber: T) {
    const isExist = list.indexOf(subscriber) !== -1;

    if (!isExist) {
      list.push(subscriber);
    }
  }

  //TODO: fix removements
  private removeFromList<T>(list: T[], subscriber: T) {
    const observerIndex = list.indexOf(subscriber);
    if (observerIndex === -1) return;
    list.splice(observerIndex, 1);
  }

  public subscribe(subscriber: Subscriber<T> | ISubscriber<T>) {
    this.addToList<SubscriberArgs<T>>(this.subscribers, subscriber);
  }

  public unsubscribe(subscriber: Subscriber<T> | ISubscriber<T>) {
    this.removeFromList<SubscriberArgs<T>>(this.subscribers, subscriber);
  }

  public notifyAll(args: T): void {
    this.subscribers.forEach((s) =>
      typeof s === "object" ? s.runOnEvent(args) : s(args)
    );
  }
}
