import {
  RiPauseCircleFill,
  RiPlayCircleFill,
  RiSkipBackFill,
  RiSkipForwardFill
} from "@remixicon/react"
import { Button } from "../common/button"
import { Song } from "@renderer/types/song"
import { CoverArt } from "./components/CoverArt"
import { SongScrubber } from "./components/song-scrubber"
import { useSongScrubber } from "./hooks/useSongScrubber"
import { useEffect } from "react"

interface PlayerProps {
  song: Song
  onSkipNext: () => void
  onSkipPrev: () => void
  onFinish: () => void
}

export const Player = ({
  song,
  onSkipNext,
  onSkipPrev,
  onFinish
}: PlayerProps) => {
  const { name, artist, prev, src } = song
  const hasPrevSong = !!prev

  const {
    ref,
    isPlaying,
    currentTime,
    onTogglePlay,
    onScrollMove,
    onScrollSet,
    onTimeUpdate
  } = useSongScrubber()

  const PlayIcon = isPlaying ? RiPauseCircleFill : RiPlayCircleFill

  const handleSpaceBarKeypress = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      onTogglePlay()
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceBarKeypress)
    return () => {
      window.removeEventListener("keydown", handleSpaceBarKeypress)
    }
  }, [])

  return (
    <div className="flex flex-col gap-y-4 px-10 pt-4">
      <CoverArt image={""} />
      <div className="">
        <div className="font-bold text-xl !text-white truncate ">{name}</div>
        <div className="text-sm">{artist}</div>
      </div>
      <SongScrubber
        ref={ref}
        audioSrc={src}
        currentTime={currentTime}
        onSongFinish={onFinish}
        onScrollSet={onScrollSet}
        onScrollMove={onScrollMove}
        onTimeUpdate={onTimeUpdate}
      />
      <div className="flex gap-x-1 w-full justify-center">
        <Button
          className="bg-transparent enabled:hover:bg-transparent text-gray-2 hover:text-white"
          icon={<RiSkipBackFill className="w-8 h-8" />}
          disabled={!hasPrevSong}
          onClick={onSkipPrev}
          variant="tertiary"
        />
        <Button
          className="rounded-full !p-0 bg-transparent text-white enabled:hover:bg-transparent enabled:hover:text-gray-1 active:transition-transform active:scale-90"
          onClick={onTogglePlay}
          icon={<PlayIcon className="w-16 h-16" />}
          variant="tertiary"
        />
        <Button
          className="bg-transparent enabled:hover:bg-transparent text-gray-2 hover:text-white"
          onClick={onSkipNext}
          icon={<RiSkipForwardFill className="w-8 h-8" />}
          variant="tertiary"
        />
      </div>
    </div>
  )
}
