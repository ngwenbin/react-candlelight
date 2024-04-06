import clsx from "clsx"
import { Image } from "@renderer/components/common/image"

interface SongDisplayProps {
  name: string
  artist: string
  coverImg?: string
  focused?: boolean
}

export const SongDisplay = ({ name, artist, focused, coverImg }: SongDisplayProps) => (
  <div className="flex items-center gap-x-3 bg-primary-dark p-3 w-full">
    <Image
      src={coverImg}
      className="p-1 w-10 h-10 rounded-md"
      errorClassName="p-2 bg-primary-main"
    />
    <div className="flex flex-col min-w-0">
      <div className={clsx("font-medium truncate", focused && "text-primary-main")}>{name}</div>
      <div className="text-gray-3 text-xs">{artist}</div>
    </div>
  </div>
)
