import { createPortal } from 'react-dom'

import { Modal } from '@components/molecules/modal'
import { SettingModal } from '@components/organism/setting-modal'
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

function App () {
  const {
    timeList,
    timeSelected,
    settings,
    openModal,
    onCloseModal
  } = useInitApp()
  const { time, changeTime, toggleStar, isRunning } = usePomodoro(timeSelected)

  const $modalContent = document.querySelector('#modal')
  const rawTime = getTimeSelected({
    timeSelected,
    useRawValue: true
  })

  return (
    <>
      {
        createPortal(
          <Modal isOpen={openModal} onClose={onCloseModal}>
            <SettingModal
              settings={settings}
              onClose={onCloseModal}/>
          </Modal>,
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
          <TimerButton onClick={toggleStar}>
            <TimerLabel>
              <h2> {getTimeoutLabel(time)} </h2>
              <span> {getPomodoroLabelStatus(isRunning, time)} </span>
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
        <Button onClick={onCloseModal}>
          <IconSetting/>
        </Button>
      </FooterTimerStyled>

    </>
  )
}

export default App
