import clsx from "clsx"
import { SongDisplay } from "../song/SongDisplay"
import { SongList } from "../song/SongList"
import { SongData } from "@renderer/types/song"
import { Modal } from "../common/modal"

interface QueueMenuProps {
  songQueue: SongData[]
  onClose: () => void
  onSongClick: (id: string) => void
}

/**
 * Display current queue songs
 */
export const QueueMenu = ({
  songQueue,
  onClose,
  onSongClick
}: QueueMenuProps) => {
  const [firstSong, ...songs] = songQueue

  return (
    <Modal title="Your Queue" onClose={onClose}>
      <div
        className={clsx(
          "overflow-auto grow flex flex-col gap-y-2",
          "[&::-webkit-scrollbar-thumb]:bg-transparent",
          "group-hover:[&::-webkit-scrollbar-thumb]:bg-gray-7"
        )}
      >
        <div>
          <div className="font-bold text-xl mb-2">Now playing</div>
          <SongDisplay data={firstSong} onClick={onSongClick} focused />
        </div>
        <div>
          <div className="font-bold text-xl mb-2">Up Next</div>
          <SongList songs={songs} onSongClick={onSongClick} />
        </div>
      </div>
    </Modal>
  )
}
