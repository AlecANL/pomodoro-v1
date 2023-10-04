import { createPortal } from 'react-dom'

import { Tab } from '@components/molecules/tab'
import { Button } from '@components/atoms/button'
import { IconSetting } from '@components/atoms/icons'
import { ProgressCircle } from '@components/atoms/progress-circle'
import { usePomodoro } from '@/hooks/usePomodoro.ts'
import { useInitApp } from '@/hooks/useInitApp.ts'
import { getTimeSelected } from '@/utils/settings.util.ts'
import { getPomodoroLabelStatus, getTimeoutLabel } from '@/utils/time.utils.ts'
import {
  AppStyled,
  FooterTimerStyled,
  Header,
  TimerButton,
  TimerLabel,
  TimerSectionStyled
} from '@/styles/app.styled.tsx'
import './index.css'
import { lazy, Suspense } from 'react'

const ModalLazy = lazy(() => import('@components/molecules/modal/modal.tsx'))
const SettingModalLazy = lazy(() => import('@components/organism/setting-modal/setting-modal.tsx'))

function App () {
  const {
    timeList,
    timeSelected,
    settings,
    openModal,
    onCloseModal,
    isSoundOff
  } = useInitApp()
  const { time, changeTime, toggleStar, isRunning } = usePomodoro(timeSelected, isSoundOff)

  const $modalContent = document.querySelector('#modal')
  const rawTime = getTimeSelected({
    timeSelected,
    useRawValue: true
  })

  return (
    <>
      {
        createPortal(
          <Suspense fallback={null}>
            <ModalLazy isOpen={openModal} onClose={onCloseModal}>
              <SettingModalLazy
                settings={settings}
                onClose={onCloseModal}/>
            </ModalLazy>
          </Suspense>,
          $modalContent as HTMLElement
        )
      }

      <Header>
        <h1>Pomodoro</h1>
        <Tab timeList={timeList} onChangeTime={changeTime}
             timeSelected={timeSelected}/>
      </Header>

      <AppStyled>
        <TimerSectionStyled>
          <TimerButton data-testid='timeButton' onClick={toggleStar}>
            <TimerLabel>
              <h2 data-testid='timePlaceholdert'> {getTimeoutLabel(time)} </h2>
              <span data-testid='pomodoroStatus'> {getPomodoroLabelStatus(isRunning, time)} </span>
            </TimerLabel>
            <ProgressCircle
              currentTime={time}
              time={rawTime}
              isStart={isRunning}
            />
          </TimerButton>
        </TimerSectionStyled>
      </AppStyled>

      <FooterTimerStyled>
        <Button data-testid='settingsButton' aria-label='button open settings modal' onClick={onCloseModal}>
          <IconSetting/>
        </Button>
      </FooterTimerStyled>
    </>
  )
}

export default App
