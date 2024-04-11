import { Layout } from "@renderer/components/common/layout"
import { Player } from "@renderer/components/player"
import { useShuffleEngine } from "@renderer/hooks/useShuffleEngine"
import { songCollection } from "@renderer/lib/songs"
import { QueueInterface } from "@renderer/components/queue-menu"
import { SettingsInterface } from "./components/settings"
import { SettingsConfig } from "./components/settings/SettingsMenu"

function App(): JSX.Element {
  const {
    loading,
    peekMax,
    setPeekMax,
    currentSong,
    handleNextSong,
    handlePeekQueue,
    handleSkipToSong,
    handlePreviousSong
  } = useShuffleEngine()

  const currentSongId = currentSong?.data?.songId
  const currentSongData = songCollection[currentSongId ?? ""]

  const handleOnConfirmSettings = (data: SettingsConfig) => {
    const { peekMax: updatedPeekMax } = data
    setPeekMax(updatedPeekMax)
  }

  const handleGetSongQueue = () => {
    const data = handlePeekQueue()
    const filledData = data?.map((song) => {
      const { songId, id } = song.data
      const songDetails = songCollection[songId]
      return {
        id,
        songId,
        ...songDetails
      }
    })
    return filledData ?? []
  }

  return (
    <Layout className="px-10 pt-4 relative">
      <Player
        hasPrevious={!!currentSong?.prev}
        song={currentSongData}
        onFinish={handleNextSong}
        onSkipNext={handleNextSong}
        onSkipPrev={handlePreviousSong}
        loading={loading}
      />
      <div className="w-full flex justify-between">
        <SettingsInterface
          settings={{ peekMax }}
          onConfirmSettings={handleOnConfirmSettings}
        />
        <QueueInterface
          onSongClick={handleSkipToSong}
          getSongQueue={handleGetSongQueue}
        />
      </div>
    </Layout>
  )
}

export default App
