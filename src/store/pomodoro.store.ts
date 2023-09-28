import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { type PomodoroState } from '@/models/pomodoro-state.interface.ts'
import { type SettingItem } from '@/models/time.interface.ts'
import { getTimeSelected } from '@/utils/settings.util.ts'

export const usePomodoroStore = create<PomodoroState>()(devtools((set) => ({
  time: 0,
  isRunning: false,
  toggleRunning: (value: boolean) => {
    set(() => ({ isRunning: value }), false, 'TOGGLE_RUNNING')
  },
  setTime: (time: number) => {
    set(() => ({ time: time - 1 }), false, 'SET_TIME')
  },
  setTimeValue: (timeSelected: SettingItem | null) => {
    set(() => ({ time: getTimeSelected(timeSelected) }), false, 'SET_INITIAL_TIME')
  }
}), {
  name: 'pomodoro-store'
}))
