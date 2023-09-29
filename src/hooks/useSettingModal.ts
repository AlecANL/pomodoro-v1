import { useSettingsStore } from '@/store/settings.store.ts'
import { buildColorFontFormSTate, buildTimeListFormState } from '@/utils/form.util.ts'
import type React from 'react'
import { useState } from 'react'
import { type FormStateInterface } from '@/models/form-state.interface.ts'

interface Props {
  onClose: () => void
}

export function useSettingModal (props: Props) {
  const { onClose } = props
  const {
    setColorSelected,
    setFontSelected,
    setNewTime,
    getCurrentTimeList,
    colorSelected,
    fontSelected
  } = useSettingsStore()
  const [form, setForm] = useState<FormStateInterface>(buildInitialFormState())

  function buildInitialFormState () {
    const timeList = getCurrentTimeList()
    const timeListForm = buildTimeListFormState(timeList)
    const colorFontFormState = buildColorFontFormSTate(colorSelected, fontSelected)

    return {
      ...timeListForm,
      ...colorFontFormState
    }
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const isValidForm = Object.entries(form).every(([_, value]) => value.isValid)
    if (!isValidForm) return

    const { color, font, ...rest } = form
    setColorSelected(color.id)
    setFontSelected(font.id)
    setNewTime(rest)
    onClose()
  }

  const validateFormValue = (name: string, value: string) => {
    if (name === 'color' || name === 'font') return true

    const currentValue = Number(value)
    return !(currentValue <= 0 || currentValue > 60)
  }

  const isControlValid = (control: string | undefined) => {
    if (!control) return false

    return form[control as keyof typeof form].isValid
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = event.target

    setForm({
      ...form,
      [name]: {
        value,
        id,
        isValid: validateFormValue(name, value)
      }
    })
  }

  const getFormValue = (control: string | undefined) => {
    if (!control) return

    return form[control as keyof typeof form].value
  }

  return {
    onSubmit,
    onInputChange,
    getFormValue,
    isControlValid
  }
}
