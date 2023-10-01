import { CircleIconStyled } from '@components/atoms/progress-circle/progress-circle.styled.tsx'
import { useRef } from 'react'
import { useProgressCircle } from '@/hooks/useProgressCircle.ts'

interface Props {
  currentTime: number
  time: number
  isStart: boolean
}

export const ProgressCircle = (props: Props) => {
  const { time, currentTime, isStart } = props
  const circleElementRef = useRef<SVGCircleElement>(null)
  useProgressCircle({
    element: circleElementRef,
    time,
    currentTime,
    isStart
  })

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
