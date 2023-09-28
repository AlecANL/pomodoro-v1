import { type SettingItem } from '@/models/time.interface.ts'
import { useEffect } from 'react'
import { usePomodoroStore } from '@/store/pomodoro.store.ts'
import { useSettingsStore } from '@/store/settings.store.ts'

export function usePomodoro (timeSelected: SettingItem | null) {
  const { changeTimeSelected } = useSettingsStore()
  const {
    time,
    isRunning,
    toggleRunning,
    setTime,
    setTimeValue
  } = usePomodoroStore()

  const getTimeSelected = (timeSelect: SettingItem | null) => {
    if (!timeSelect) return 0

    return Number(timeSelect.value) * 60
  }

  useEffect(() => {
    setTimeValue(timeSelected)
  }, [timeSelected])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && time === 0) {
      toggleRunning(false)
      setTime(getTimeSelected(timeSelected))
      clearInterval(interval as unknown as NodeJS.Timeout)
    }

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time)
      }, 1000)
    }

    return () => {
      if (interval != null) clearInterval(interval)
    }
  }, [isRunning, time])

  const changeTime = (time: SettingItem) => {
    toggleRunning(false)
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
