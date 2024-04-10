import { SongData } from "@renderer/types/song"
import { SongDisplay } from "./SongDisplay"
import { FixedSizeList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { CSSProperties } from "react"

interface SongListProps {
  songs: SongData[]
  onSongClick?: (id: string, idx: number) => void
}

const Row = ({
  index,
  style,
  data
}: {
  index
  style: CSSProperties
  data: { songs: SongData[]; onSongClick?: (id: string, idx: number) => void }
}) => {
  const { songs, onSongClick } = data
  const item = songs[index]
  return (
    <div style={style}>
      <SongDisplay data={item} onClick={(id) => onSongClick?.(id, index)} />
    </div>
  )
}
export const SongList = ({ songs, onSongClick }: SongListProps) => {
  return (
    <div className="flex flex-col grow">
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemSize={56}
            itemCount={songs.length}
            height={height}
            width={width}
            itemData={{ songs, onSongClick }}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  )
}
