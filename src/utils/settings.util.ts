import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'
import settingsJson from '@/data/settings.json'
import { type FormStateKeyValues, type TimeFormState } from '@/models/form-state.interface.ts'
import { type GetSettingById } from '@/models/settings-state.interface.ts'

export const setDefaultColorSetting = (settings: Settings[]) => {
  const colorSetting = settings.find((setting) => setting.control === SETTING_CONTROLS.COLOR)
  const defaultSetting = settingsJson.find((setting) => setting.control === SETTING_CONTROLS.COLOR)
  return colorSetting ? colorSetting.items[0] : defaultSetting?.items[0]
}

export const getSettingById = (parameters: GetSettingById) => {
  const { id, settings, control } = parameters
  return settings.find((setting) => setting.control === control)?.items.find((item) => item.id === id)
}

export const getTimeListSetting = (settings: Settings[]) => {
  return settings.find((setting) => setting.control === SETTING_CONTROLS.TIME)?.items ?? [] as SettingItem[]
}

export const setDefaultFontSetting = (settings: Settings[]) => {
  const fontSetting = settings.find((setting) => setting.control === SETTING_CONTROLS.FONT)
  const defaultSetting = settingsJson.find((setting) => setting.control === SETTING_CONTROLS.FONT)
  return fontSetting ? fontSetting.items[0] : defaultSetting?.items[0]
}

export const setDefaultTime = (settings: Settings[]) => {
  const fontSetting = settings.find((setting) => setting.control === SETTING_CONTROLS.TIME)
  return fontSetting ? fontSetting.items[0] : null
}

export const getTimeSelected = (timeSelected: SettingItem | null) => {
  if (!timeSelected) return 0

  return Number(timeSelected.value) * 60
}

export const getTime = (timeSelected: SettingItem | null) => {
  if (!timeSelected) return 0
  return Number(timeSelected.value)
}

export const getSelectedItem = (selectedItem: SettingItem | null) => {
  return selectedItem ?? {} as SettingItem
}

export const changePomodoroTimeSettings = (settings: Settings[], formValues: TimeFormState) => {
  const timeSettingsPosition = settings.findIndex((setting) => setting.control === SETTING_CONTROLS.TIME)

  if (timeSettingsPosition === -1) return settings

  const newTime = settings[timeSettingsPosition].items.map(item => {
    const label = (item.label ?? '') as FormStateKeyValues

    if (item.id === formValues[label].id) {
      return {
        ...item,
        value: Number(formValues[label].value)
      }
    }

    return item
  })

  return [
    ...settings.slice(0, timeSettingsPosition),
    {
      ...settings[timeSettingsPosition],
      items: newTime
    },
    ...settings.slice(timeSettingsPosition + 1)
  ]
}
