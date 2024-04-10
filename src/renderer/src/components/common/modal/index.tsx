import { RiCloseLine } from "@remixicon/react"
import { Button } from "../button"

interface ModalProps {
  title?: string
  onClose?: () => void
  children: React.ReactNode
}

export const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div>
      <div className="group absolute w-full min-h-screen max-h-screen top-0 left-0 backdrop-blur-md bg-primary-dark/90 flex flex-col py-8 px-6">
        <div className="font-bold pb-6 text-primary-light flex justify-between items-center">
          {title}
          <Button
            icon={
              <RiCloseLine className="text-primary-light hover:text-primary-main" />
            }
            variant="actionLink"
            className="pt-0.5"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  )
}
