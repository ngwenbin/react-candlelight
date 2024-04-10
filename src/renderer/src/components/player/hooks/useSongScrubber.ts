import { useRef, useState } from "react"

export const useSongScrubber = () => {
  const busy = useRef<boolean>(false)
  const ref = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState<number>(0) // UI current time.

  const isBusy = busy.current

  const onTogglePlay = () => {
    setIsPlaying((curr) => {
      const playStatus = !curr
      if (playStatus) {
        ref.current?.play()
      } else {
        ref.current?.pause()
      }

      return playStatus
    })
  }

  const onScrollMove = (value: number) => {
    busy.current = true
    setCurrentTime(value)
  }

  const onScrollSet = () => {
    busy.current = false
    if (ref.current) {
      ref.current.currentTime = currentTime
    }
  }

  const onTimeUpdate = (value: number) => {
    if (!isBusy) {
      setCurrentTime(value)
    }
  }

  return {
    ref,
    isPlaying,
    setIsPlaying,
    currentTime,
    onTogglePlay,
    onScrollMove,
    onScrollSet,
    onTimeUpdate
  }
}
