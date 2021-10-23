export default class Composite<T> {
  constructor(
    public data: T[],
  ) {
  }

  private currentIndex = 0;

  public getPrev(relativeIndex?: number) {
    if (relativeIndex) {
      if (relativeIndex - 1 >= 0)
        return this.data[relativeIndex - 1];
    } else {
      if (this.currentIndex - 1 >= 0) {
        const item = this.data[this.currentIndex - 1];
        this.currentIndex--;
        return item;
      }
    }
  }

  public getCurrent() {
    return this.data[this.currentIndex];
  }

  public getNext(relativeIndex?: number) {
    if (relativeIndex) {
      if (relativeIndex + 1 <= this.data.length)
        return this.data[relativeIndex + 1];
    } else {
      if (this.currentIndex + 1 <= this.data.length) {
        const item = this.data[this.currentIndex + 1];
        this.currentIndex++;
        return item;
      }
    }
  }

  public at(index: number) {
    if (index >= 0 && index <= this.data.length - 1)
      return this.data[index];
  }
}