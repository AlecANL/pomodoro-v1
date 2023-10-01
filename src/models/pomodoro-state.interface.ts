import { type SettingItem } from '@/models/time.interface.ts'

export interface PomodoroState {
  time: number
  isRunning: boolean
  toggleRunning: (value: boolean) => void
  setTime: (time: number) => void
  setTimeValue: (timeSelected: SettingItem | null) => void
}

export const POMODORO_ACTIONS_TYPES = {
  TOGGLE_RUNNING: 'TOGGLE_RUNNING',
  SET_TIME: 'SET_TIME',
  SET_INITIAL_TIME: 'SET_INITIAL_TIME'
} as const
