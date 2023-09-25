import { useEffect, useState } from 'react'
import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import { Modal } from '@components/modal/modal.tsx'
import { SettingModal } from '@components/setting-modal/setting-modal.tsx'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'
import { createPortal } from 'react-dom'
import { AppStyled, FooterTimerStyled, Header, TimerButton, TimerLabel, TimerSectionStyled } from '@/app.styled.tsx'
import { Button } from '@components/button/button.tsx'
import { IconSetting } from '@components/icons/setting.tsx'
import './index.css'
import { CircleIcon } from '@components/icons/icons.tsx'
import { Tab } from '@components/tab/tab.tsx'

function App () {
  const [state, setState] = useState<Settings[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [timeSelected, setTimeSelected] = useState<SettingItem | null>(null)
  const [colorSelected, setColorSelected] = useState<SettingItem | null>(null)
  const [fontSelected, setFontColorSelected] = useState<SettingItem | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [start, setStart] = useState(false)
  const currentStroke = '#535bf2'

  const getStorageSettings = (state: Settings[]) => {
    const key = '__pomodoro_settings__v1__'
    const settings = localStorage.getItem(key)
    return settings != null ? JSON.parse(settings) as Settings[] : state
  }

  const getDefaultColor = (state: Settings[]) => {
    return state.find(item => item.control === SETTING_CONTROLS.COLOR)?.items[0] as SettingItem
  }

  const getDefaultFont = (state: Settings[]) => {
    return state.find(item => item.control === SETTING_CONTROLS.FONT)?.items[0] as SettingItem
  }

  const getTime = (time: number | string | null | undefined) => {
    if (!time) return 0

    return Number(time) * 60
  }

  const getTimeListSettings = (settings: Settings[]) => {
    return settings.find(item => item.control === 'timeList')?.items ?? []
  }

  const getRawTime = (time: number | string | null | undefined) => {
    if (!time) return 0

    return Number(time)
  }

  useEffect(() => {
    if (colorSelected != null) {
      document.documentElement.style.setProperty('--current-color', `var(--${String(colorSelected.value)})`)
    }

    if (fontSelected != null) {
      document.documentElement.style.setProperty('--currentFont', `${String(fontSelected.value)}`)
    }
  }, [fontSelected, colorSelected])

  const getCurrentTimeSelected = () => {
    return timeSelected as SettingItem
  }

  useEffect(() => {
    const getAppSettings = async () => {
      const response = await fetch('src/data/settings.json')
      return await (await response.json() as Promise<Settings[]>)
    }

    getAppSettings().then(data => {
      setState(getStorageSettings(data))
      setTimeSelected(data[0].items[0])
      setCurrentTime(getTime(data[0].items[0].value))
      setColorSelected(getDefaultColor(data))
      setFontColorSelected(getDefaultFont(data))
    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (start && currentTime === 0) {
      setStart(false)
      setCurrentTime(getTime(timeSelected?.value))
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

  const changeTime = (time: SettingItem) => {
    setStart(false)
    setTimeSelected(time)
    setCurrentTime(getTime(time.value))
  }

  const toggleStar = () => {
    setStart(prevState => !prevState)
  }

  const timeoutLabel = () => {
    const minutes = ('0' + String(Math.floor(currentTime / 60))).slice(-2)
    const seconds = ('0' + String(Math.floor(currentTime % 60))).slice(-2)
    return `${minutes}:${seconds}`
  }

  const onCloseModal = () => {
    setOpenModal(prev => !prev)
  }

  const label = timeoutLabel()
  const textLabel = start ? 'Pause' : 'Start'
  const text = start && currentTime <= 0 ? 'Restart' : textLabel
  const $modalContent = document.querySelector('#modal')

  return (
    <>
      {
        createPortal(
          <Modal isOpen={openModal} onClose={onCloseModal}>
            <SettingModal
              settings={state}
              currentColor={colorSelected as SettingItem}
              onClose={onCloseModal}
              currentFont={fontSelected as SettingItem}/>
          </Modal>,
          $modalContent as HTMLElement
        )
      }

      <Header>
        <h1>Pomodoro</h1>
        <Tab timeList={getTimeListSettings(state)} onChangeTime={changeTime} timeSelected={getCurrentTimeSelected()}/>
      </Header>

      <AppStyled>
        <TimerSectionStyled>
          <TimerButton onClick={toggleStar}>
            <TimerLabel>
              <h2> {label} </h2>
              <span> {text} </span>
            </TimerLabel>
            <CircleIcon
              currentTime={currentTime}
              time={getRawTime(timeSelected?.value)}
              stroke={currentStroke}
              isStart={start}
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
