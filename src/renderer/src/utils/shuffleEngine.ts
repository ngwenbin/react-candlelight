import { Song } from "@renderer/types/song"
import { QUEUE_CAPACITY, Queue } from "./queue"

const DEFAULT_PEEK_MAX = 5

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

  peekQueue(peekMax?: number): Song[] | undefined {
    const peekValue = peekMax ?? DEFAULT_PEEK_MAX
    return this.queue.peek(
      peekValue <= QUEUE_CAPACITY ? peekValue : QUEUE_CAPACITY
    )
  }

  nextSong(): Song | undefined {
    return this.queue.dequeue()
  }

  previousSong(): Song | undefined {
    const curr = this.queue.peek(1)?.[0]
    if (curr?.prev) {
      this.setSongs([curr.prev])
    }
    return curr?.prev
  }
}
