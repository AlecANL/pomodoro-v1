import { CircleIconStyled } from '@components/icons/icon.styled.tsx'
import './icons.css'
import { type RefObject, useEffect, useRef } from 'react'

interface Props {
  currentTime: number
  time: number
  isStart: boolean
}

export const CircleIcon = (props: Props) => {
  const DEFAULT_DASH_ARRAY = '816.8140899333462 816.8140899333462'
  const DEFAULT_DASH_OFFSET = '0'

  const { time, currentTime, isStart } = props
  const circleElementRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    handleProgress(circleElementRef)
  }, [currentTime])

  const handleProgress = (element: RefObject<SVGCircleElement>) => {
    if (element.current == null) return

    const $element = circleElementRef.current as SVGCircleElement

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

  return (
    <>
      <CircleIconStyled
        id="svg"
        height="277"
        width="277">
        <circle
          ref={circleElementRef}
          id="circle"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="130"
          cx="50%"
          cy="50%"
        ></circle>
      </CircleIconStyled>
    </>
  )
}
