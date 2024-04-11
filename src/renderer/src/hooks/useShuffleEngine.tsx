import { ShuffleEngine } from "@renderer/utils/shuffleEngine"
import { useEffect, useMemo, useState } from "react"
import { songIds } from "@renderer/lib/songs"
import { Song } from "@renderer/types/song"
import { v4 as uuidv4 } from "uuid"
import { ListNode } from "@renderer/utils/doublyLL"

export const DEFAULT_PEEK_MAX = 5

const createRandomSongList = (
  size: number,
  selection: string[],
  prevSong?: Song
) => {
  const list: Song[] = []
  for (let x = 0; x < size; x++) {
    const prev: Song | undefined = prevSong ?? x > 0 ? list[x - 1] : undefined
    // Filtering out prev song id so that the same song will not be selected back to back.
    const availableSongIds = selection.filter((x) => x !== prev?.songId)

    const randomSongId =
      availableSongIds[Math.floor(Math.random() * availableSongIds.length)]

    const song = {
      // Generating random id so that each song is unique. Safe to do so because ids
      // are generated on function call, not on render.
      id: uuidv4(),
      songId: randomSongId
    }
    list.push(song)
  }

  return list
}

/**
 * Shuffle engine hook
 * Generates Peek Max songs on initial mount
 */
export const useShuffleEngine = () => {
  const [loading, setLoading] = useState(true)
  const [peekMax, setPeekMax] = useState(DEFAULT_PEEK_MAX)
  const [currentSong, setCurrentSong] = useState<ListNode<Song> | null>(null)
  const [songQueue, setSongQueue] = useState<Song[]>([])

  const shuffleEngine = useMemo(() => new ShuffleEngine(), [])

  const refreshSongs = (prevSong?: Song) => {
    const currentSize = shuffleEngine.queue.size()
    const availableCapacity = peekMax - currentSize
    const songList = createRandomSongList(availableCapacity, songIds, prevSong)
    shuffleEngine.setSongs(songList)

    const updatedSongList = shuffleEngine?.peekQueue(peekMax)

    setSongQueue(updatedSongList.map((i) => i.data))
    setCurrentSong(updatedSongList[0])
    setLoading(false)
  }

  const handleNextSong = () => {
    const poppedSong = shuffleEngine.nextSong()
    refreshSongs(poppedSong?.data)
  }

  const handlePreviousSong = () => {
    shuffleEngine.previousSong()
    refreshSongs()
  }

  const handlePeekQueue = () => {
    refreshSongs()
    return shuffleEngine.peekQueue(peekMax)
  }

  const handleSkipToSong = (id: string, idx: number) => {
    for (let x = 0; x <= idx; x++) {
      handleNextSong()
    }
  }

  useEffect(() => {
    setLoading(true)
    refreshSongs()
  }, [])

  return {
    loading,
    peekMax,
    setPeekMax,
    songQueue,
    currentSong,
    handleNextSong,
    handlePreviousSong,
    handlePeekQueue,
    handleSkipToSong
  }
}
