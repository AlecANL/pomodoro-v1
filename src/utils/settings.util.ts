import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'

export const setDefaultColorSetting = (settings: Settings[]) => {
  const colorSetting = settings.find((setting) => setting.control === SETTING_CONTROLS.COLOR)
  return colorSetting ? colorSetting.items[0] : null
}

export const setDefaultFontSetting = (settings: Settings[]) => {
  const fontSetting = settings.find((setting) => setting.control === SETTING_CONTROLS.FONT)
  return fontSetting ? fontSetting.items[0] : null
}

export const setDefaultTime = (settings: Settings[]) => {
  console.log('settings', settings)
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
