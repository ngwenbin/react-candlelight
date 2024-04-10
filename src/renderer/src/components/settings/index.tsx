import { RiSettings4Line } from "@remixicon/react"
import { Button } from "@renderer/components/common/button"
import { useState } from "react"
import { SettingsConfig, SettingsMenu } from "./SettingsMenu"

interface SettingsInterfaceProps {
  onConfirmSettings: (data: SettingsConfig) => void
  settings: SettingsConfig
}

export const SettingsInterface = ({
  onConfirmSettings,
  settings
}: SettingsInterfaceProps) => {
  const [show, setShow] = useState(false)

  const handleToggleMenu = () => {
    setShow((curr) => !curr)
  }

  return (
    <div className="">
      <Button
        variant="secondary"
        className="rounded-full border-none"
        size="small"
        icon={<RiSettings4Line />}
        onClick={handleToggleMenu}
      />
      {show && (
        <SettingsMenu
          onClose={handleToggleMenu}
          onConfirm={onConfirmSettings}
          initialState={settings}
        />
      )}
    </div>
  )
}
