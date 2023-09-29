import { type SettingItem } from '@/models/time.interface.ts'
import { type TimeFormState } from '@/models/form-state.interface.ts'

export const buildTimeListFormState = (timeList: SettingItem[]) => {
  const form: any = {}

  for (const item of timeList) {
    form[item.label ?? ''] = {
      id: item.id,
      value: item.value,
      isValid: true
    }
  }

  return form as TimeFormState
}

export const buildColorFontFormSTate = (colorSelected: SettingItem | null, fontSelected: SettingItem | null) => {
  return {
    color: {
      value: colorSelected?.value as string,
      isValid: true,
      id: colorSelected?.id as string
    },
    font: {
      value: fontSelected?.value as string,
      isValid: true,
      id: fontSelected?.id as string
    }
  }
}
