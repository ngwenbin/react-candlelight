import React, { useState } from "react"
import clsx from "clsx"
import placeHolderSvg from "@renderer/assets/images/placeHolder.svg"

export interface ImageProps {
  className?: string
  errorClassName?: string
  src?: string | null
  alt?: string | null
}

export const Image: React.FC<ImageProps> = ({
  className,
  errorClassName,
  alt,
  src
}: ImageProps) => {
  const [isError, setIsError] = useState(!src)

  return (
    <img
      src={src || placeHolderSvg}
      alt={alt || ""}
      className={clsx(className, isError && errorClassName)}
      onError={(e) => {
        e.currentTarget.src = placeHolderSvg
        setIsError(true)
      }}
      loading="lazy"
    />
  )
}
