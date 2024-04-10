import { FormInput } from "@renderer/components/common/Input"
import { Button } from "@renderer/components/common/button"
import { Modal } from "@renderer/components/common/modal"
import { FieldValues, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const SettingsSchema = z.object({
  peekMax: z.number().int().positive().min(1).max(100000)
})

export type SettingsConfig = z.infer<typeof SettingsSchema>

interface SettingsMenuProps {
  onClose: () => void
  onConfirm: (data: SettingsConfig) => void
  initialState: SettingsConfig
}

export const SettingsMenu = ({
  onClose,
  onConfirm,
  initialState
}: SettingsMenuProps) => {
  const { peekMax } = initialState
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(SettingsSchema)
  })

  const handleOnConfirmSettings = (data: FieldValues) => {
    onConfirm(data as SettingsConfig)
    onClose()
  }

  return (
    <Modal title="Settings" onClose={onClose}>
      <form
        onSubmit={handleSubmit(handleOnConfirmSettings)}
        className="gap-y-2 flex flex-col"
      >
        <FormInput
          {...register("peekMax", { valueAsNumber: true })}
          id="peekMax"
          label="Number of queued songs in a view"
          defaultValue={peekMax}
          errors={errors?.peekMax?.message as string}
        />
        <Button text="Confirm" type="submit" className="mt-4" />
      </form>
    </Modal>
  )
}
