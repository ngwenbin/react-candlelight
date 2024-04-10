import clsx from "clsx"
import { SongDisplay } from "../song/SongDisplay"
import { SongList } from "../song/SongList"
import { SongData } from "@renderer/types/song"
import { Modal } from "../common/modal"
import { Spinner } from "../common/loader-animations"
import { useEffect, useState } from "react"

interface QueueMenuProps {
  onClose: () => void
  getSongQueue: () => SongData[]
  onSongClick: (id: string, idx: number) => void
}

/**
 * Display current queue songs
 */
export const QueueMenu = ({
  onClose,
  getSongQueue,
  onSongClick
}: QueueMenuProps) => {
  const [songQueue, setSongQueue] = useState<SongData[]>([])
  const [firstSong, ...songs] = songQueue

  const handleSongClick = (id: string, idx: number) => {
    onSongClick(id, idx)
    setSongQueue(getSongQueue())
  }

  useEffect(() => {
    setSongQueue(getSongQueue())
  }, [])

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
