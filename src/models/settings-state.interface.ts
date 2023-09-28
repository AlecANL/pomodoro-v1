import { type SettingItem, type Settings } from '@/models/time.interface.ts'

export interface ISettingState {
  settings: Settings[]
  colorSelected: SettingItem | null
  fontSelected: SettingItem | null
  loadSettings: () => Promise<void>
  getTimeList: (settings: Settings[]) => SettingItem[]
  timeSelected: SettingItem | null
  setDefaultTimeSelected: (settings: Settings[]) => void
  changeTimeSelected: (time: SettingItem) => void
  setColorSelected: (idColor: string) => void
  setFontSelected: (idFont: string) => void
  setNewTime: (x: any) => void
}
