import clsx from "clsx"
import { Image } from "@renderer/components/common/image"
import { SongData } from "@renderer/types/song"

interface SongDisplayProps {
  data: SongData
  focused?: boolean
  onClick?: (id: string) => void
}

export const SongDisplay = ({ data, focused, onClick }: SongDisplayProps) => {
  const { id, name, artist, coverImg } = data

  const handleClick = () => {
    onClick?.(id)
  }

  return (
    <div
      className={clsx(
        "flex items-center gap-x-3 py-2 px-3 w-full",
        onClick && "cursor-pointer hover:bg-primary-dark light rounded"
      )}
      onClick={handleClick}
    >
      <Image
        src={coverImg}
        className="p-1 w-10 h-10 rounded-md"
        errorClassName="p-2 bg-primary-main"
      />
      <div className="flex flex-col min-w-0">
        <div
          className={clsx(
            "font-medium truncate",
            focused && "text-primary-main"
          )}
        >
          {name}
        </div>
        <div className="text-gray-3 text-xs">{artist}</div>
      </div>
    </div>
  )
}
