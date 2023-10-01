import { type RefObject, useEffect } from 'react'
import { DEFAULT_DASH_ARRAY, DEFAULT_DASH_OFFSET } from '@/const/settings.const.ts'

interface Props {
  currentTime: number
  time: number
  isStart: boolean
  element: RefObject<SVGCircleElement>
}

export function useProgressCircle (parameters: Props) {
  const { currentTime, time, isStart, element } = parameters

  useEffect(() => {
    handleProgress(element)
  }, [currentTime])

  const handleProgress = (element: RefObject<SVGCircleElement>) => {
    if (element.current == null) return

    const $element = element.current

    if (!isStart) {
      $element.style.strokeDasharray = DEFAULT_DASH_ARRAY
      $element.style.strokeDashoffset = DEFAULT_DASH_OFFSET
      return
    }

    const radius = $element.getAttribute('r')
    const circumference = Number(radius) * 2 * Math.PI

    const percent = (currentTime / (time * 60)) * 100
    const offset = circumference - (percent / 100) * circumference

    $element.style.strokeDasharray = `${circumference} ${circumference}`
    $element.style.strokeDashoffset = `${offset}`
  }
}
