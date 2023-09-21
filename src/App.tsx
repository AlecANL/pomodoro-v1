import { useEffect, useState } from 'react'
import { GlobalStyles } from '@components/global-styles.styled.tsx'
import timeDefaultJson from '@data/time-default.json'
import { AppStyled, FooterTimerStyled, TimerButton, TimerLabel, TimerSectionStyled } from '@/app.styled.tsx'
import { Tab } from '@components/tab/tab.tsx'
import { CircleIcon } from '@components/icons/icons.tsx'
import { IconSetting } from '@components/icons/setting.tsx'

function App () {
  const [currentTime, setCurrentTime] = useState(1 * 60)
  const [start, setStart] = useState(false)
  const currentStroke = '#535bf2'

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (start && currentTime === 0) {
      setStart(false)
      setCurrentTime(1 * 60)
      clearInterval(interval as unknown as NodeJS.Timeout)
    }

    if (start && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(prevState => prevState - 1)
      }, 1000)
    }

    return () => {
      if (interval != null) clearInterval(interval)
    }
  }, [start, currentTime])

  const toggleStar = () => {
    setStart(prevState => !prevState)
  }

  const timeoutLabel = () => {
    const minutes = ('0' + String(Math.floor(currentTime / 60))).slice(-2)
    const seconds = ('0' + String(Math.floor(currentTime % 60))).slice(-2)
    return `${minutes}:${seconds}`
  }

  const label = timeoutLabel()
  const textLabel = start ? 'Pause' : 'Start'
  const text = start && currentTime <= 0 ? 'Restart' : textLabel

  return (
    <>
      <GlobalStyles/>
      <AppStyled>
        <Tab timeList={timeDefaultJson}/>
        <TimerSectionStyled>
          <TimerButton onClick={toggleStar}>
            <TimerLabel>
              <h2> {label} </h2>
              <span> {text} </span>
            </TimerLabel>
            <CircleIcon
              currentTime={currentTime}
              time={1}
              stroke={currentStroke}
            />
          </TimerButton>
        </TimerSectionStyled>
        <FooterTimerStyled>
          <IconSetting/>
        </FooterTimerStyled>
      </AppStyled>

    </>
  )
}

export default App
