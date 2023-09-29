import { createPortal } from 'react-dom'
import { Modal } from '@components/modal/modal.tsx'
import { SettingModal } from '@components/setting-modal/setting-modal.tsx'
import { Button } from '@components/button/button.tsx'
import { IconSetting } from '@components/icons/setting.tsx'
import { CircleIcon } from '@components/icons/icons.tsx'
import { Tab } from '@components/tab/tab.tsx'
import { usePomodoro } from '@/hooks/usePomodoro.ts'
import { useInitApp } from '@/hooks/useInitApp.ts'
import { getSelectedItem, getTime } from '@/utils/settings.util.ts'
import { getPomodoroLabelStatus, getTimeoutLabel } from '@/utils/time.utils.ts'
import { AppStyled, FooterTimerStyled, Header, TimerButton, TimerLabel, TimerSectionStyled } from '@/app.styled.tsx'
import './index.css'

function App () {
  const {
    timeList,
    timeSelected,
    settings,
    openModal,
    onCloseModal,
    colorSelected,
    fontSelected
  } = useInitApp()
  const { time, changeTime, toggleStar, isRunning } = usePomodoro(timeSelected)

  const $modalContent = document.querySelector('#modal')

  return (
    <>
      {
        createPortal(
          <Modal isOpen={openModal} onClose={onCloseModal}>
            <SettingModal
              settings={settings}
              currentColor={colorSelected}
              onClose={onCloseModal}
              currentFont={fontSelected}/>
          </Modal>,
          $modalContent as HTMLElement
        )
      }

      <Header>
        <h1>Pomodoro</h1>
        <Tab timeList={timeList} onChangeTime={changeTime}
             timeSelected={getSelectedItem(timeSelected)}/>
      </Header>

      <AppStyled>
        <TimerSectionStyled>
          <TimerButton onClick={toggleStar}>
            <TimerLabel>
              <h2> {getTimeoutLabel(time)} </h2>
              <span> {getPomodoroLabelStatus(isRunning, time)} </span>
            </TimerLabel>
            <CircleIcon
              currentTime={time}
              time={getTime(timeSelected)}
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
