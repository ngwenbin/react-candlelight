import clsx from "clsx"
import { InputHTMLAttributes, forwardRef } from "react"

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string
  label?: string
  containerClassName?: string
  errors?: React.ReactNode
}

/**
 * Uncontrolled Input component with label
 */
export const FormInput = forwardRef(
  (
    {
      id,
      label,
      className,
      containerClassName,
      errors,
      ...props
    }: FormInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={clsx("flex flex-col gap-y-2", containerClassName)}>
        <label htmlFor={id} className="font-medium text-primary-light">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          id={id}
          className={clsx(
            "placeholder:text-gray-5 w-full text-primary-light bg-primary-dark border-gray-7 min-h-[32px] border rounded text-base px-3 focus-visible:outline-gray-1 focus-visible:outline-1 focus-visible:outline focus-visible:outline-offset-0",
            className
          )}
        />
        <div className="text-xs text-red-400">{errors}</div>
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
