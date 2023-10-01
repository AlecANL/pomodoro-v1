import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import { type TimeFormState } from '@/models/form-state.interface.ts'
import { type SettingControlsType } from '@/const/settings.const.ts'

export interface ISettingState {
  settings: Settings[]
  colorSelected: SettingItemType
  fontSelected: SettingItemType
  loadSettings: () => Promise<void>
  getTimeList: (settings: Settings[]) => SettingItem[]
  getCurrentTimeList: () => SettingItem[]
  timeSelected: SettingItem | null
  setDefaultTimeSelected: (settings: Settings[]) => void
  changeTimeSelected: (time: SettingItem) => void
  setColorSelected: (idColor: string) => void
  setFontSelected: (idFont: string) => void
  setNewTime: (formValues: TimeFormState) => void
}

export const SETTING_STATE_KEY_NAME = '__v1__pomodoro_settings__'

export const SETTING_ACTIONS_TYPES = {
  LOAD_SETTINGS: 'LOAD_SETTINGS',
  SET_DEFAULT_TIME: 'SET_DEFAULT_TIME',
  CHANGE_TIME_SELECTED: 'CHANGE_TIME_SELECTED',
  SET_COLOR_SELECTED: 'SET_COLOR_SELECTED',
  SET_FONT_SELECTED: 'SET_FONT_SELECTED',
  SET_NEW_TIME: 'SET_NEW_TIME'
} as const

export type SettingItemType = SettingItem | null

export interface GetSettingById {
  id: string
  settings: Settings[]
  control: SettingControlsType
}

export interface TimeValueParameters {
  timeSelected: SettingItemType
  useRawValue?: boolean
}
