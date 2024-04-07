import { Song } from "@renderer/types/song"
import { SongDisplay } from "./SongDisplay"

interface SongListProps {
  songs: Song[]
}

export const SongList = ({ songs }: SongListProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      {songs.map((song) => {
        const { src, name, artist } = song
        return <SongDisplay key={src} name={name} artist={artist} />
      })}
    </div>
  )
}
