import { useEffect, useState } from 'react'
import { type SettingItem } from '@/models/time.interface.ts'
import { Modal } from '@components/modal/modal.tsx'
import { SettingModal } from '@components/setting-modal/setting-modal.tsx'
import { createPortal } from 'react-dom'
import { AppStyled, FooterTimerStyled, Header, TimerButton, TimerLabel, TimerSectionStyled } from '@/app.styled.tsx'
import { Button } from '@components/button/button.tsx'
import { IconSetting } from '@components/icons/setting.tsx'
import './index.css'
import { CircleIcon } from '@components/icons/icons.tsx'
import { useSettingsStore } from '@/store/settings.store.ts'
import { usePomodoro } from '@/hooks/usePomodoro.ts'
import { Tab } from '@components/tab/tab.tsx'
import { getSelectedItem, getTime } from '@/utils/settings.util.ts'

function App () {
  const {
    loadSettings,
    settings,
    colorSelected,
    fontSelected,
    timeSelected,
    getTimeList,
    setDefaultTimeSelected
  } = useSettingsStore()
  const timeList = getTimeList(settings)
  const { time, changeTime, toggleStar, isRunning } = usePomodoro(timeSelected)

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  useEffect(() => {
    setDefaultTimeSelected(settings)
  }, [settings])

  useEffect(() => {
    if (colorSelected != null) {
      document.documentElement.style.setProperty('--current-color', `var(--${String(colorSelected.value)})`)
    }

    if (fontSelected != null) {
      document.documentElement.style.setProperty('--currentFont', `${String(fontSelected.value)}`)
    }
  }, [fontSelected, colorSelected])

  const timeoutLabel = () => {
    const minutes = ('0' + String(Math.floor(time / 60))).slice(-2)
    const seconds = ('0' + String(Math.floor(time % 60))).slice(-2)
    return `${minutes}:${seconds}`
  }

  const onCloseModal = () => {
    setOpenModal(prev => !prev)
  }

  const label = timeoutLabel()
  const textLabel = isRunning ? 'Pause' : 'Start'
  const text = isRunning && time <= 0 ? 'Restart' : textLabel
  const $modalContent = document.querySelector('#modal')

  return (
    <>
      {
        createPortal(
          <Modal isOpen={openModal} onClose={onCloseModal}>
            <SettingModal
              settings={settings}
              currentColor={colorSelected as SettingItem}
              onClose={onCloseModal}
              currentFont={fontSelected as SettingItem}/>
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
              <h2> {label} </h2>
              <span> {text} </span>
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
