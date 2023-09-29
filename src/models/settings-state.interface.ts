import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import { type TimeFormState } from '@/models/form-state.interface.ts'
import { type SettingControlsType } from '@/const/settings.const.ts'

export interface ISettingState {
  settings: Settings[]
  colorSelected: SettingItem | null
  fontSelected: SettingItem | null
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

export interface GetSettingById {
  id: string
  settings: Settings[]
  control: SettingControlsType
}
