import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { POMODORO_ACTIONS_TYPES, type PomodoroState } from '@/models/pomodoro-state.interface.ts'
import { type SettingItem } from '@/models/time.interface.ts'
import { getChangedTime, getTimeSelected } from '@/utils/settings.util.ts'
import { SWITCH_TURN_POMODORO, ZERO_TIME } from '@/const/settings.const.ts'

export const usePomodoroStore = create<PomodoroState>()(devtools((set) => ({
  time: ZERO_TIME,
  isRunning: SWITCH_TURN_POMODORO.OFF,
  toggleRunning: (value: boolean) => {
    set(() => ({ isRunning: value }), false, POMODORO_ACTIONS_TYPES.TOGGLE_RUNNING)
  },
  setTime: (time: number) => {
    set(() => ({ time: getChangedTime(time) }), false, POMODORO_ACTIONS_TYPES.SET_TIME)
  },
  setTimeValue: (timeSelected: SettingItem | null) => {
    set(() => ({
      time: getTimeSelected({
        timeSelected: timeSelected as SettingItem
      })
    }), false, POMODORO_ACTIONS_TYPES.SET_INITIAL_TIME)
  }
}), {
  name: 'pomodoro-store'
}))
