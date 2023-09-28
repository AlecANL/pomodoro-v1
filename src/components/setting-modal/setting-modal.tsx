import { type SettingItem, type Settings } from '@/models/time.interface.ts'
import React, { useState } from 'react'
import {
  ModalControlTitle,
  ModalForm,
  ModalFormColorControl,
  ModalFormFontControl,
  ModalFormInputControl,
  ModalFormInputControlGroup,
  ModalFormInputItem,
  ModalFormRadioControlGroup,
  ModalSettingHeader,
  ModalSettingTitle,
  ModalWrapper
} from './setting-modal.styled'
import { IconClose } from '@components/icons/setting.tsx'
import { Button } from '@components/button/button.tsx'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'
import { Input } from '@components/atoms/input'
import { type FormStateInterface } from '@/models/form-state.interface.ts'
import { useSettingsStore } from '@/store/settings.store.ts'

interface Props {
  settings: Settings[]
  currentColor: SettingItem
  currentFont: SettingItem
  onClose: () => void
}

export function SettingModal (props: Props) {
  const { currentColor, currentFont, settings, onClose } = props
  const { setColorSelected, setFontSelected, setNewTime } = useSettingsStore()
  const getFormInitialState = (settings: Settings[]): FormStateInterface => {
    // storage
    const timeList = settings.find(item => item.control === SETTING_CONTROLS.TIME)?.items ?? []

    const timeObj: Record<string, { value: string, isValid: boolean, id: string }> = {}

    timeList.forEach(item => {
      timeObj[item.label ?? ''] = {
        value: String(item.value),
        isValid: true,
        id: item.id
      }
    })

    return {
      ...timeObj,
      color: {
        value: currentColor.value,
        isValid: true,
        id: currentColor.id
      },
      font: {
        value: currentFont.value,
        isValid: true,
        id: currentFont.id
      }
    } as FormStateInterface
  }

  const [form, setForm] = useState<FormStateInterface>(getFormInitialState(settings))

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const isValidForm = Object.entries(form).every(([_, value]) => value.isValid)
    if (!isValidForm) return

    const { color, font, ...rest } = form
    setColorSelected(color.id as string)
    setFontSelected(font.id as string)
    setNewTime(rest)
    onClose()
  }

  const validateFormValue = (name: string, value: string) => {
    if (name === 'color' || name === 'font') return true

    const currentValue = Number(value)
    return !(currentValue <= 0 || currentValue > 60)
  }

  const isControlValid = (control: string | undefined) => {
    if (!control) return false

    return form[control as keyof typeof form].isValid
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = event.target

    setForm({
      ...form,
      [name]: {
        value,
        id,
        isValid: validateFormValue(name, value)
      }
    })
  }

  const getFormValue = (control: string | undefined) => {
    if (!control) return

    return form[control as keyof typeof form].value
  }

  return (
    <>
      <ModalWrapper onSubmit={onSubmit}>
        <ModalSettingHeader>
          <ModalSettingTitle>Settings</ModalSettingTitle>
          <Button onClick={onClose}>
            <IconClose/>
          </Button>
        </ModalSettingHeader>

        <ModalForm>
          {
            settings.map(setting => (
              <React.Fragment key={setting.id}>
                {
                  setting.control === SETTING_CONTROLS.TIME && (
                    <ModalFormInputControl>
                      <ModalControlTitle>{setting.name}</ModalControlTitle>
                      <ModalFormInputControlGroup>
                        {
                          setting.items.map(item => (
                            <ModalFormInputItem key={item.id}>
                              <label htmlFor={item.id}>{item.name}</label>
                              <Input
                                name={item.label}
                                value={getFormValue(item.label)}
                                onChange={onInputChange}
                                id={item.id} type='number'>
                                {!isControlValid(item.label) && 'Invalid value'}
                              </Input>
                            </ModalFormInputItem>
                          ))
                        }
                      </ModalFormInputControlGroup>
                    </ModalFormInputControl>
                  )
                }
                {
                  setting.control === SETTING_CONTROLS.FONT && (
                    <ModalFormFontControl>
                      <ModalControlTitle>{setting.name}</ModalControlTitle>
                      <ModalFormRadioControlGroup>
                        {
                          setting.items.map(item => (
                            <div key={item.id}>
                              <label htmlFor={item.id}></label>
                              <Input
                                name={'font'}
                                value={item.value}
                                checked={item.value === getFormValue('font')}
                                onChange={onInputChange}
                                id={item.id}
                                type='radio'/>
                            </div>
                          ))
                        }
                      </ModalFormRadioControlGroup>
                    </ModalFormFontControl>
                  )
                }

                {
                  setting.control === SETTING_CONTROLS.COLOR && (
                    <ModalFormColorControl className='form-group'>
                      <ModalControlTitle>{setting.name}</ModalControlTitle>
                      <ModalFormRadioControlGroup>
                        {
                          setting.items.map(item => (
                            <div key={item.id}>
                              <label htmlFor={item.id}></label>
                              <Input
                                name={'color'}
                                value={item.value}
                                onChange={onInputChange}
                                checked={item.value === getFormValue('color')}
                                id={item.id}
                                type='radio'/>
                            </div>
                          ))
                        }
                      </ModalFormRadioControlGroup>
                    </ModalFormColorControl>
                  )
                }
              </React.Fragment>
            ))
          }

          <Button variant={'custom'}>Apply</Button>
        </ModalForm>
      </ModalWrapper>
    </>
  )
}
