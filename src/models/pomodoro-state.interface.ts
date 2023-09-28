import { type SettingItem } from '@/models/time.interface.ts'

export interface PomodoroState {
  time: number
  isRunning: boolean
  toggleRunning: (value: boolean) => void
  setTime: (time: number) => void
  setTimeValue: (timeSelected: SettingItem | null) => void
}
