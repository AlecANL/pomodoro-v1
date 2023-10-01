import { type Settings } from '@/models/time.interface.ts'
import React from 'react'
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
} from './setting-modal.styled.tsx'
import { IconClose } from '@components/atoms/icons/icons.tsx'
import { Button } from '@components/atoms/button/button.tsx'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'
import { Input } from '@components/atoms/input'
import { useSettingModal } from '@/hooks/useSettingModal.ts'

interface Props {
  settings: Settings[]
  onClose: () => void
}

export function SettingModal (props: Props) {
  const { settings, onClose } = props
  const { onSubmit, isControlValid, onInputChange, getFormValue } = useSettingModal({
    onClose
  })

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
