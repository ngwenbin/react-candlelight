import { Image } from "../../common/image"

interface CoverArtProps {
  image?: string
}

export const CoverArt = ({ image }: CoverArtProps) => {
  return (
    <div className="">
      <Image
        src={image}
        className="rounded-md"
        errorClassName="!p-24 bg-primary-main"
      />
    </div>
  )
}
