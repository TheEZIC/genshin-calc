export interface ISubscriber<SubscriberArgs = void > {
  runOnListener: (args: SubscriberArgs) => void;
}

export default class Listener<SubscriberArgs = void> {
  private subscribers: ISubscriber<SubscriberArgs>[] = [];

  public subscribe(subscriber: ISubscriber<SubscriberArgs>) {
    const isExist = this.subscribers.includes(subscriber);

    if (!isExist) {
      this.subscribers.push(subscriber);
    }
  }

  public unsubscribe(subscriber: ISubscriber<SubscriberArgs>) {
    const observerIndex = this.subscribers.indexOf(subscriber);
    if (observerIndex === -1) return;
    this.subscribers.splice(observerIndex, 1);
  }

  public notifyAll(args: SubscriberArgs): void {
    this.subscribers.forEach((s) => s.runOnListener(args));
  }
}