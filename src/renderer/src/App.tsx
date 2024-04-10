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

  const currentSongData = currentSong
    ? {
        ...currentSong,
        ...songCollection[currentSong.songId ?? ""]
      }
    : undefined

  const handleOnQueueOpen = () => {
    const data = handlePeekQueue()
    const filledData = data?.map((i) => ({
      ...i,
      ...songCollection[i.songId]
    }))
    return filledData ?? []
  }

  const handleOnConfirmSettings = (data: SettingsConfig) => {
    const { peekMax: updatedPeekMax } = data
    setPeekMax(updatedPeekMax)
  }

  return (
    <Layout className="px-10 pt-4 relative">
      <Player
        hasPrevious={!!currentSongData?.prev}
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
          getSongQueue={handleOnQueueOpen}
        />
      </div>
    </Layout>
  )
}

export default App
