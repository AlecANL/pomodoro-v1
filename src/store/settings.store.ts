import { create } from 'zustand'
import { type ISettingState } from '@/models/settings-state.interface.ts'
import { devtools, persist } from 'zustand/middleware'
import { getAppSettings } from '@/services/settings.service.ts'
import {
  changePomodoroTimeSettings,
  getSettingById,
  getTimeListSetting,
  getTimeSelected,
  setDefaultColorSetting,
  setDefaultFontSetting,
  setDefaultTime
} from '@/utils/settings.util.ts'
import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'
import { type TimeFormState } from '@/models/form-state.interface.ts'

export const useSettingsStore = create<ISettingState>()(devtools(persist((set, get) => ({
  settings: [],
  colorSelected: null,
  fontSelected: null,
  timeSelected: null,
  loadSettings: async () => {
    const { colorSelected, fontSelected, settings } = get()
    const settingsResponse = await getAppSettings()
    const settingsToUse = settings.length > 0 ? settings : settingsResponse
    const colorToUse = colorSelected ?? setDefaultColorSetting(settings)
    const fontToUSe = fontSelected ?? setDefaultFontSetting(settings)
    set(() => ({ settings: settingsToUse, colorSelected: colorToUse, fontSelected: fontToUSe }), false, 'LOAD_SETTINGS')
  },
  getTimeList: (settings: Settings[]) => {
    return getTimeListSetting(settings)
  },
  setDefaultTimeSelected: (settings: Settings[]) => {
    const timeSelected = setDefaultTime(settings)
    set(() => ({ timeSelected, time: getTimeSelected(timeSelected) }), false, 'SET_DEFAULT_TIME')
  },
  changeTimeSelected: (time: SettingItem) => {
    set(() => ({ timeSelected: time, isRunning: false, time: getTimeSelected(time) }), false, 'CHANGE_TIME_SELECTED')
  },
  setColorSelected: (idColor: string) => {
    const { settings } = get()
    const foundColor = getSettingById({ id: idColor, settings, control: SETTING_CONTROLS.COLOR })
    set(() => ({ colorSelected: foundColor }), false, 'SET_COLOR_SELECTED')
  },
  setFontSelected: (idFont: string) => {
    const { settings } = get()
    const foundFont = getSettingById({ id: idFont, settings, control: SETTING_CONTROLS.FONT })
    set(() => ({ fontSelected: foundFont }), false, 'SET_FONT_SELECTED')
  },
  setNewTime: (formValues: TimeFormState) => {
    const { settings } = get()
    const newSettings = changePomodoroTimeSettings(settings, formValues)

    set(() => ({ settings: newSettings }), false, 'SET_NEW_TIME')
  },
  getCurrentTimeList: () => {
    const { settings } = get()
    return getTimeListSetting(settings)
  }
}), {
  name: 'settings-store'
})))
