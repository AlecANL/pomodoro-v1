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

interface Props {
  settings: Settings[]
  currentColor: SettingItem
  currentFont: SettingItem
  onClose: () => void
}

export function SettingModal (props: Props) {
  const [form, setForm] = useState<FormStateInterface>({
    pomodoro: {
      value: '25',
      isValid: true
    },
    shortBreak: {
      value: '5',
      isValid: true
    },
    longBreak: {
      value: '15',
      isValid: true
    },
    font: {
      value: '',
      isValid: true
    },
    color: {
      value: '',
      isValid: true
    }
  })

  const { settings, onClose } = props

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  const validateFormValue = (value: number | string) => {
    const currentValue = Number(value)
    if (typeof value === 'string' && isNaN(currentValue)) return

    return !(currentValue <= 0 || currentValue > 60)
  }

  const isControlValid = (control: string | undefined) => {
    if (!control) return false

    return form[control as keyof typeof form].isValid
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: {
        value,
        isValid: validateFormValue(value)
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
                              <input id={item.id} value={item.value} type='radio'/>
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
                              <input id={item.id} value={item.value} type='radio'/>
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
