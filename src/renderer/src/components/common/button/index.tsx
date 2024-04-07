import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

// caution: actionLink !== link, link should be an anchor tag.
// actionLink is a link-like button, only for actions, not redirects.
type ButtonVariant = "primary" | "secondary" | "actionLink" | "tertiary"

type ButtonSize = "small" | "medium"

// Custom subclass Button component
// that extends the button superclass, obeying the Liskov Substitution Principle.
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  text?: string
  variant?: ButtonVariant
  icon?: React.ReactNode
  size?: ButtonSize
}

const ButtonVariantClassNameMap: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-main text-primary-light hover:bg-[#CF602F] border-transparent",
  secondary:
    "text-primary-light bg-primary-dark border-gray-1 border-opacity-30 hover:border-opacity-100",
  tertiary: "bg-white text-black hover:bg-gray-1 border-transparent",
  actionLink: "text-primary-main hover:text-[#FF996F] border-transparent"
}

const ButtonSizeClassNameMap: Record<ButtonSize, string> = {
  small: "min-h-[24px] px-2 text-sm gap-x-1",
  medium: "min-h-[32px] font-medium text-base px-3 gap-x-2 "
}

export const Button = ({
  className,
  text,
  icon,
  variant = "primary",
  size = "medium"
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        ButtonVariantClassNameMap[variant],
        ButtonSizeClassNameMap[size],
        "flex items-center justify-center rounded border outline-none focus-visible:outline-gray-1 focus-visible:outline-1 focus-visible:outline focus-visible:outline-offset-0",
        className
      )}
    >
      {text}
      {icon}
    </button>
  )
}
