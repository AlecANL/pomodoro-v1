import settingsJson from '../../public/data/settings.json'
import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import {
  SETTING_CONTROLS,
  type SettingControlsType,
  TIME_IN_HOUR_MINUTES,
  TIME_TO_CALC_CHANGED_TME,
  ZERO_TIME
} from '@/const/settings.const.ts'
import { type FormStateKeyValues, type TimeFormState } from '@/models/form-state.interface.ts'
import { type GetSettingById, type TimeValueParameters } from '@/models/settings-state.interface.ts'

export const getSettingById = (parameters: GetSettingById) => {
  const { id, settings, control } = parameters
  return settings.find((setting) => setting.control === control)?.items.find((item) => item.id === id)
}

const findByOneSettingItem = (settings: Settings[], control: SettingControlsType) => {
  return settings.find((setting) => setting.control === control)?.items[0]
}

export const getTimeListSetting = (settings: Settings[]) => {
  return settings.find((setting) => setting.control === SETTING_CONTROLS.TIME)?.items ?? [] as SettingItem[]
}

export const setDefaultColorSetting = (settings: Settings[]) => {
  const colorSetting = findByOneSettingItem(settings, SETTING_CONTROLS.COLOR)
  const defaultSetting = findByOneSettingItem(settingsJson, SETTING_CONTROLS.COLOR)
  return colorSetting ?? defaultSetting
}

export const setDefaultFontSetting = (settings: Settings[]) => {
  const fontSetting = findByOneSettingItem(settings, SETTING_CONTROLS.FONT)
  const defaultSetting = findByOneSettingItem(settingsJson, SETTING_CONTROLS.FONT)
  return fontSetting ?? defaultSetting
}

export const setDefaultTime = (settings: Settings[]) => {
  const fontSetting = findByOneSettingItem(settings, SETTING_CONTROLS.TIME)
  const defaultFontSetting = findByOneSettingItem(settingsJson, SETTING_CONTROLS.TIME)
  return fontSetting ?? defaultFontSetting
}

export const getTimeSelected = (parameters: TimeValueParameters) => {
  const { timeSelected, useRawValue } = parameters

  if (!timeSelected) return ZERO_TIME
  const currentValue = parseInt(timeSelected.value as string, 10)
  return useRawValue ? currentValue : currentValue * TIME_IN_HOUR_MINUTES
}

export const getChangedTime = (time: number) => {
  return time - TIME_TO_CALC_CHANGED_TME
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
