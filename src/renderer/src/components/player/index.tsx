import {
  RiPauseCircleFill,
  RiPlayCircleFill,
  RiSkipBackFill,
  RiSkipForwardFill
} from "@remixicon/react"
import { Button } from "../common/button"
import { SongData } from "@renderer/types/song"
import { CoverArt } from "./components/CoverArt"
import { SongScrubber } from "./components/song-scrubber"
import { useSongScrubber } from "./hooks/useSongScrubber"
import { useEffect } from "react"

interface PlayerProps {
  song?: Omit<SongData, "id" | "songId">
  loading: boolean
  hasPrevious: boolean
  onFinish: () => void
  onSkipNext: () => void
  onSkipPrev: () => void
}

export const Player = ({
  song,
  loading,
  hasPrevious,
  onFinish,
  onSkipNext,
  onSkipPrev
}: PlayerProps) => {
  const { name, artist, src, coverImg } = song ?? {}
  const hasSongLoaded = !!song

  const {
    ref,
    isPlaying,
    setIsPlaying,
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

  const handleOnFinish = () => {
    onTogglePlay()
    onFinish()
  }

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceBarKeypress)
    return () => {
      window.removeEventListener("keydown", handleSpaceBarKeypress)
    }
  }, [])

  return (
    <div className="flex flex-col gap-y-4">
      <CoverArt image={coverImg} />
      <div className="">
        <div className="font-bold text-xl !text-white truncate">{name}</div>
        <div className="text-sm">{artist}</div>
      </div>
      <SongScrubber
        ref={ref}
        audioSrc={src ?? ""}
        onPlaying={() => setIsPlaying(true)}
        currentTime={currentTime}
        onSongFinish={handleOnFinish}
        onScrollSet={onScrollSet}
        onScrollMove={onScrollMove}
        onTimeUpdate={onTimeUpdate}
      />
      <div className="flex gap-x-1 w-full justify-center">
        <Button
          className="!bg-transparent enabled:hover:bg-transparent text-gray-2 hover:text-white"
          icon={<RiSkipBackFill className="w-8 h-8" />}
          disabled={!hasPrevious || !hasSongLoaded || loading}
          onClick={onSkipPrev}
          variant="tertiary"
        />
        <Button
          className="rounded-full !p-0 !bg-transparent text-white enabled:hover:bg-transparent enabled:hover:text-gray-1 active:transition-transform active:scale-90"
          onClick={onTogglePlay}
          icon={<PlayIcon className="w-16 h-16" />}
          variant="tertiary"
          disabled={!hasSongLoaded || loading}
        />
        <Button
          className="!bg-transparent enabled:hover:bg-transparent text-gray-2 hover:text-white"
          onClick={onSkipNext}
          icon={<RiSkipForwardFill className="w-8 h-8" />}
          variant="tertiary"
          disabled={!hasSongLoaded || loading}
        />
      </div>
    </div>
  )
}
