export const QUEUE_CAPACITY = 1000000

export class Queue<T> {
  private items: T[] = []
  private capacity: number = QUEUE_CAPACITY

  enqueue(item: T): void {
    if (this.size() < this.capacity) {
      console.log("pushed")
      this.items.push(item)
    } else {
      throw new Error("Max capacity reached.")
    }
  }

  dequeue(): T | undefined {
    return this.items.shift()
  }

  peek(count: number): T[] | undefined {
    const items = this.items.slice(0, count)
    return items.length === 0 ? undefined : items
  }

  size(): number {
    return this.items.length
  }
}
