import clsx from "clsx"
import { SongDisplay } from "../song/SongDisplay"
import { SongList } from "../song/SongList"
import { Modal } from "../common/modal"
import { Spinner } from "../common/loader-animations"
import { Song } from "@renderer/types/song"

interface QueueMenuProps {
  onClose: () => void
  songQueue: Song[]
  onSongClick: (id: string, idx: number) => void
}

/**
 * Display current queue songs
 */
export const QueueMenu = ({
  onClose,
  songQueue,
  onSongClick
}: QueueMenuProps) => {
  const [firstSong, ...songs] = songQueue

  const handleSongClick = (id: string, idx: number) => {
    onSongClick(id, idx)
  }

  return (
    <Modal title="Your Queue" onClose={onClose}>
      <div
        className={clsx(
          "relative overflow-auto grow flex flex-col gap-y-2",
          "[&::-webkit-scrollbar-thumb]:bg-transparent",
          "group-hover:[&::-webkit-scrollbar-thumb]:bg-gray-7"
        )}
      >
        {songQueue.length === 0 ? (
          <Spinner className="absolute mx-auto my-auto inset-0" />
        ) : (
          <>
            <div>
              <div className="font-bold text-xl mb-2">Now playing</div>
              <SongDisplay data={firstSong} focused />
            </div>
            <div className="h-full grow flex flex-col">
              <div className="font-bold text-xl mb-2">Up Next</div>
              <SongList songs={songs} onSongClick={handleSongClick} />
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
