export interface Song {
  name: string
  artist: string
  src: string
  prev?: Song // Not ideal since it is wasting memory, should be a song ID ideally. Using object as pointer as there is no BE.
}
