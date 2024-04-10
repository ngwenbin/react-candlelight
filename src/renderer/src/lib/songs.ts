import YtqDJc from "@renderer/assets/songs/Bach - Prelude C major.mp3"
import Ri4Sq6 from "@renderer/assets/songs/David Foster - Grown-Up Christmas List.mp3"
import UrUBWG from "@renderer/assets/songs/Max Richter - On the nature of daylight.mp3"
import ZZOOcL from "@renderer/assets/songs/Yiruma - Waltz in E Minor.mp3"
import { SongData } from "@renderer/types/song"

export const songIds = ["YtqDJc", "Ri4Sq6", "UrUBWG", "ZZOOcL"]

export const songCollection: Record<string, Omit<SongData, "id" | "songId">> = {
  YtqDJc: {
    name: "Prelude C major",
    artist: "Bach",
    src: YtqDJc
  },
  Ri4Sq6: {
    name: "Grown-Up Christmas List",
    artist: "David Foster",
    src: Ri4Sq6
  },
  UrUBWG: {
    name: "On the Nature of Daylight",
    artist: "Max Richter",
    src: UrUBWG
  },
  ZZOOcL: {
    name: "Waltz in E Minor",
    artist: "Yiruma",
    src: ZZOOcL
  }
}
