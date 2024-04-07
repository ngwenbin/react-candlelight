import { forwardRef, useState } from "react"
import "./slider.css"
import toNumber from "lodash/toNumber"

interface SongScrubberProps {
  audioSrc: string
  currentTime: number
  onScrollSet: () => void
  onSongFinish: () => void
  onScrollMove: (value: number) => void
  onTimeUpdate: (value: number) => void
}

/**
 * // Controlled input component
 */
export const SongScrubber = forwardRef(
  (
    {
      audioSrc,
      currentTime,
      onScrollSet,
      onSongFinish,
      onScrollMove,
      onTimeUpdate
    }: SongScrubberProps,
    ref: React.ForwardedRef<HTMLAudioElement>
  ) => {
    const [max, setMax] = useState<number>()
    const isLoading = max === undefined

    const handleOnScrollMove = (e: React.ChangeEvent<HTMLInputElement>) => {
      const time = toNumber(e.currentTarget.value)
      onScrollMove(time)
    }

    const handleOnScrollSet = () => {
      onScrollSet()
    }

    const handleTimeUpdate = (
      e: React.SyntheticEvent<HTMLAudioElement, Event>
    ) => {
      const time = e.currentTarget.currentTime
      onTimeUpdate(time)
    }

    const handleOnEnded = () => {
      onSongFinish()
    }

    const handleOnMetaDataLoad = (
      e: React.SyntheticEvent<HTMLAudioElement, Event>
    ) => {
      setMax(e.currentTarget?.duration)
    }

    return (
      <>
        <audio
          ref={ref}
          src={audioSrc}
          onEnded={handleOnEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleOnMetaDataLoad}
        />
        <input
          tabIndex={-1}
          type="range"
          value={currentTime}
          onMouseUp={handleOnScrollSet}
          onChange={handleOnScrollMove}
          onKeyDown={(e) => e.preventDefault()}
          disabled={isLoading}
        />
      </>
    )
  }
)

SongScrubber.displayName = "SongScrubber"
