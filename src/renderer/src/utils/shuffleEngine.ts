import { Song } from "@renderer/types/song"
import { QUEUE_CAPACITY, Queue } from "./queue"
import { ListNode } from "./doublyLL"

export class ShuffleEngine {
  queue: Queue<Song> = new Queue()

  setSongs(songList: Song[]): void {
    try {
      for (const song of songList) {
        this.queue.enqueue(song)
      }
    } catch (err) {
      console.error(err)
    }
  }

  peekQueue(peekMax: number): ListNode<Song>[] {
    const peekValue = peekMax
    return this.queue.peek(
      peekValue <= QUEUE_CAPACITY ? peekValue : QUEUE_CAPACITY
    )
  }

  nextSong(): ListNode<Song> | null {
    return this.queue.dequeue()
  }

  previousSong(): void {
    const currSong = this.queue.peek(1)[0]
    const prev = currSong.prev

    if (prev) {
      this.queue.insertStart(prev.data)
    }
  }

  lastSong(): ListNode<Song> | null {
    return this.queue.last()
  }
}
