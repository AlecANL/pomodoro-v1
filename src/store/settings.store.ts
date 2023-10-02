import { create } from 'zustand'
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
import { type ISettingState, SETTING_ACTIONS_TYPES, SETTING_STATE_KEY_NAME } from '@/models/settings-state.interface.ts'

export const useSettingsStore = create<ISettingState>()(devtools(persist((set, get) => ({
  settings: [],
  colorSelected: null,
  fontSelected: null,
  timeSelected: null,
  isSoundOff: false,
  loadSettings: async () => {
    const { colorSelected, fontSelected, settings } = get()
    const settingsResponse = await getAppSettings()
    const settingsToUse = settings.length > 0 ? settings : settingsResponse
    const colorToUse = colorSelected ?? setDefaultColorSetting(settings)
    const fontToUSe = fontSelected ?? setDefaultFontSetting(settings)
    set(() => ({
      settings: settingsToUse,
      colorSelected: colorToUse,
      fontSelected: fontToUSe
    }), false, SETTING_ACTIONS_TYPES.LOAD_SETTINGS)
  },
  getTimeList: (settings: Settings[]) => {
    return getTimeListSetting(settings)
  },
  setDefaultTimeSelected: (settings: Settings[]) => {
    const timeSelected = setDefaultTime(settings)
    set(() => ({
      timeSelected,
      time: getTimeSelected({
        timeSelected: timeSelected as SettingItem
      })
    }), false, SETTING_ACTIONS_TYPES.SET_DEFAULT_TIME)
  },
  changeTimeSelected: (time: SettingItem) => {
    set(() => ({
      timeSelected: time,
      isRunning: false,
      time: getTimeSelected({
        timeSelected: time
      })
    }), false, SETTING_ACTIONS_TYPES.CHANGE_TIME_SELECTED)
  },
  setColorSelected: (idColor: string) => {
    const { settings } = get()
    const foundColor = getSettingById({ id: idColor, settings, control: SETTING_CONTROLS.COLOR })
    set(() => ({ colorSelected: foundColor }), false, SETTING_ACTIONS_TYPES.SET_COLOR_SELECTED)
  },
  setFontSelected: (idFont: string) => {
    const { settings } = get()
    const foundFont = getSettingById({ id: idFont, settings, control: SETTING_CONTROLS.FONT })
    set(() => ({ fontSelected: foundFont }), false, SETTING_ACTIONS_TYPES.SET_FONT_SELECTED)
  },
  setNewTime: (formValues: TimeFormState) => {
    const { settings } = get()
    const newSettings = changePomodoroTimeSettings(settings, formValues)

    set(() => ({ settings: newSettings }), false, SETTING_ACTIONS_TYPES.SET_NEW_TIME)
  },
  getCurrentTimeList: () => {
    const { settings } = get()
    return getTimeListSetting(settings)
  },
  setSoundStatus: () => {
    const { isSoundOff } = get()
    set(() => ({ isSoundOff: !isSoundOff }), false, SETTING_ACTIONS_TYPES.SET_SOUND_STATUS)
  }
}), {
  name: SETTING_STATE_KEY_NAME
})))
