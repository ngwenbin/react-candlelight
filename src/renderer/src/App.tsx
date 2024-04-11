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
    songQueue,
    currentSong,
    handleNextSong,
    handleSkipToSong,
    handlePreviousSong
  } = useShuffleEngine()

  const currentSongId = currentSong?.data?.songId
  const currentSongData = songCollection[currentSongId ?? ""]

  const handleOnConfirmSettings = (data: SettingsConfig) => {
    const { peekMax: updatedPeekMax } = data
    setPeekMax(updatedPeekMax)
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
        <QueueInterface songQueue={songQueue} onSongClick={handleSkipToSong} />
      </div>
    </Layout>
  )
}

export default App
