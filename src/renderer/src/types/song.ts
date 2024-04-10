type SongId = string

export interface SongData {
  id: string
  songId: string
  name: string
  artist: string
  src: string
  coverImg?: string
}

export interface Song {
  id: string
  songId: SongId
  prev?: Song
}
