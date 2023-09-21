import { CircleIconStyled } from '@components/icons/icon.styled.tsx'
import './icons.css'
import { type RefObject, useRef } from 'react'

interface Props {
  stroke: string
  currentTime: number
  time: number
}

export const CircleIcon = (props: Props) => {
  const { stroke, time, currentTime } = props
  const circleElementRef = useRef<SVGCircleElement>(null)

  function handleProgress (elementRef: RefObject<SVGCircleElement>) {
    if (elementRef.current == null) {
      return {
        strokeDasharray: '816.8140899333462 816.8140899333462',
        strokeDashoffset: '0'
      }
    }

    const $element = elementRef.current
    const radius = $element.getAttribute('r')
    const circumference = Number(radius) * 2 * Math.PI

    const percent = (currentTime / (time * 60)) * 100
    const offset = circumference - (percent / 100) * circumference

    return {
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: `${offset}`
    }
  }

  const { strokeDasharray, strokeDashoffset } = handleProgress(circleElementRef)

  return (
    <>
      <CircleIconStyled
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        stroke={stroke}
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
