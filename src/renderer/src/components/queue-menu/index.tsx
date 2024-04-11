import { RiPlayListFill } from "@remixicon/react"
import { Button } from "@renderer/components/common/button"
import { useState } from "react"
import { QueueMenu } from "./QueueMenu"
import { Song } from "@renderer/types/song"

interface QueueInterfaceProps {
  songQueue: Song[]
  onSongClick: (id: string, idx: number) => void
}

/**
 * Interface that combines the QueueMenu Modal and a trigger button.
 */
export const QueueInterface = ({
  songQueue,
  onSongClick
}: QueueInterfaceProps) => {
  const [show, setShow] = useState(false)

  const handleShowMenu = () => {
    setShow(true)
  }

  const handleHideMenu = () => {
    setShow(false)
  }

  return (
    <div>
      <Button
        variant="secondary"
        className="rounded-full border-none"
        size="small"
        icon={<RiPlayListFill />}
        onClick={handleShowMenu}
      />
      {show && (
        <QueueMenu
          songQueue={songQueue}
          onClose={handleHideMenu}
          onSongClick={onSongClick}
        />
      )}
    </div>
  )
}
