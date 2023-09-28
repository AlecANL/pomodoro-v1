import { create } from 'zustand'
import { type ISettingState } from '@/models/settings-state.interface.ts'
import { devtools, persist } from 'zustand/middleware'
import { getAppSettings } from '@/services/settings.service.ts'
import { getTimeSelected, setDefaultColorSetting, setDefaultFontSetting, setDefaultTime } from '@/utils/settings.util.ts'
import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'

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
    return settings.find((setting) => setting.control === SETTING_CONTROLS.TIME)?.items ?? [] as SettingItem[]
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
    const foundColor = settings.find((setting) => setting.control === SETTING_CONTROLS.COLOR)?.items.find((item) => item.id === idColor)
    set(() => ({ colorSelected: foundColor }), false, 'SET_COLOR_SELECTED')
  },
  setFontSelected: (idFont: string) => {
    const { settings } = get()
    const foundFont = settings.find((setting) => setting.control === SETTING_CONTROLS.FONT)?.items.find((item) => item.id === idFont)
    set(() => ({ fontSelected: foundFont }), false, 'SET_FONT_SELECTED')
  },
  setNewTime: (x: any) => {
    const { settings } = get()
    const newSettings = settings.map(setting => {
      if (setting.control === SETTING_CONTROLS.TIME) {
        return {
          ...setting,
          items: setting.items.map(item => {
            if (item.id === x[item.label ?? ''].id) {
              return {
                ...item,
                value: Number(x[item.label ?? ''].value)
              }
            }
            return item
          })
        }
      }
      return setting
    })

    set(() => ({ settings: newSettings }), false, 'SET_NEW_TIME')
  }
}), {
  name: 'settings-store'
})))
