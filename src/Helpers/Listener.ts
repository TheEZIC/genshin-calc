export interface ISubscriber<SubscriberArgs = void> {
  runOnEvent(args: SubscriberArgs): void;
}

export type Subscriber<SubscriberArgs = void> = (args: SubscriberArgs) => void;

export default class Listener<SubscriberArgs = void> {
  private subscribers: Array<Subscriber<SubscriberArgs> | ISubscriber<SubscriberArgs>> = [];

  public subscribe(subscriber: Subscriber<SubscriberArgs> | ISubscriber<SubscriberArgs>) {
    const isExist = this.subscribers.includes(subscriber);

    if (!isExist) {
      this.subscribers.push(subscriber);
    }
  }

  public unsubscribe(subscriber: Subscriber<SubscriberArgs> | ISubscriber<SubscriberArgs>) {
    const observerIndex = this.subscribers.indexOf(subscriber);
    if (observerIndex === -1) return;
    this.subscribers.splice(observerIndex, 1);
  }

  public notifyAll(args: SubscriberArgs): void {
    this.subscribers.forEach((s) =>
      typeof s === "object" ? s.runOnEvent(args) : s(args)
    );
  }
}
