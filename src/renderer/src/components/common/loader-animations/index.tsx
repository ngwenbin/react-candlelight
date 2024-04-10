import clsx from "clsx"
import "./spinner.css"

interface BaseProps {
  className?: string
}

export const Spinner = ({ className }: BaseProps) => {
  return <div className={clsx("loader", className)}></div>
}
