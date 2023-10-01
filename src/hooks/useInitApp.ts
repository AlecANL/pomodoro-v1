import { useEffect, useState } from 'react'
import { useSettingsStore } from '@/store/settings.store.ts'
import { type SettingItem } from '@/models/time.interface.ts'
import { SWITCH_SHOW_MODAL } from '@/const/settings.const.ts'

export function useInitApp () {
  const {
    loadSettings,
    settings,
    getTimeList,
    setDefaultTimeSelected,
    colorSelected,
    fontSelected,
    timeSelected
  } = useSettingsStore()
  const timeList = getTimeList(settings)
  const [openModal, setOpenModal] = useState(SWITCH_SHOW_MODAL.HIDE)

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
  }, [colorSelected, fontSelected])

  const onCloseModal = () => {
    setOpenModal(prev => !prev)
  }

  return {
    settings,
    timeList,
    colorSelected: colorSelected as SettingItem,
    fontSelected: fontSelected as SettingItem,
    openModal,
    onCloseModal,
    timeSelected
  }
}
