import { type SettingItem } from '@/models/time.interface.ts'
import { useEffect } from 'react'
import { usePomodoroStore } from '@/store/pomodoro.store.ts'
import { useSettingsStore } from '@/store/settings.store.ts'
import { SWITCH_TURN_POMODORO, TIME_IN_SECONDS, TIME_TO_CALC_CHANGED_TME, ZERO_TIME } from '@/const/settings.const.ts'
import { getTimeSelected } from '@/utils/settings.util.ts'
import { getTimeoutLabel } from '@/utils/time.utils.ts'
import clickSound from '@/assets/sounds/tap.wav'
import alertSound from '@/assets/sounds/clock-alarm-8761.mp3'
import switchSound from '@/assets/sounds/click.wav'
// @ts-expect-error
import useSound from 'use-sound'

export function usePomodoro (timeSelected: SettingItem | null, mutedAudio = false) {
  const { changeTimeSelected } = useSettingsStore()
  const {
    time,
    isRunning,
    toggleRunning,
    setTime,
    setTimeValue
  } = usePomodoroStore()
  const [play] = useSound(clickSound, {
    mute: mutedAudio
  })
  const [playAlert] = useSound(alertSound, {
    mute: mutedAudio
  })
  const [playSwitchSound] = useSound(switchSound, {
    mute: mutedAudio
  })

  useEffect(() => {
    setTimeValue(timeSelected)
  }, [timeSelected])

  useEffect(() => {
    const title = document.querySelector('#title') as HTMLTitleElement
    title.innerText = `${getTimeoutLabel(time)} - Pomodoro`

    let interval: NodeJS.Timeout | null = null

    if (isRunning && time === ZERO_TIME) {
      toggleRunning(SWITCH_TURN_POMODORO.OFF)
      setTime(getTimeSelected({
        timeSelected: timeSelected as SettingItem
      }) + TIME_TO_CALC_CHANGED_TME)
      playAlert()
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
    playSwitchSound()
  }

  const toggleStar = () => {
    play()
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
