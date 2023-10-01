import { type SettingItem } from '@/models/time.interface.ts'
import { useEffect } from 'react'
import { usePomodoroStore } from '@/store/pomodoro.store.ts'
import { useSettingsStore } from '@/store/settings.store.ts'
import { SWITCH_TURN_POMODORO, TIME_IN_SECONDS, TIME_TO_CALC_CHANGED_TME, ZERO_TIME } from '@/const/settings.const.ts'
import { getTimeSelected } from '@/utils/settings.util.ts'

export function usePomodoro (timeSelected: SettingItem | null) {
  const { changeTimeSelected } = useSettingsStore()
  const {
    time,
    isRunning,
    toggleRunning,
    setTime,
    setTimeValue
  } = usePomodoroStore()

  useEffect(() => {
    setTimeValue(timeSelected)
  }, [timeSelected])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && time === ZERO_TIME) {
      toggleRunning(SWITCH_TURN_POMODORO.OFF)
      setTime(getTimeSelected({
        timeSelected: timeSelected as SettingItem
      }) + TIME_TO_CALC_CHANGED_TME)
      clearInterval(interval as unknown as NodeJS.Timeout)
    }

    if (isRunning && time > ZERO_TIME) {
      interval = setInterval(() => {
        setTime(time)
      }, TIME_IN_SECONDS)
    }

    return () => {
      if (interval != null) clearInterval(interval)
    }
  }, [isRunning, time])

  const changeTime = (time: SettingItem) => {
    toggleRunning(SWITCH_TURN_POMODORO.OFF)
    changeTimeSelected(time)
    setTimeValue(time)
  }

  const toggleStar = () => {
    toggleRunning(!isRunning)
  }

  return {
    changeTime,
    toggleStar,
    timeSelected,
    time,
    isRunning
  }
}
