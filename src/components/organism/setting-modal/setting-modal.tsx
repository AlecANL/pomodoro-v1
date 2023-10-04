import { type Settings } from '@/models/time.interface.ts'
import React from 'react'
import {
  ModalControlTitle,
  ModalForm,
  ModalFormColorControl,
  ModalFormColorControlItems,
  ModalFormColorLabel,
  ModalFormFontControl,
  ModalFormFontLabel,
  ModalFormInputControl,
  ModalFormInputControlGroup,
  ModalFormInputItem,
  ModalFormRadioControlGroup,
  ModalSettingHeader,
  ModalSettingTitle,
  ModalWrapper,
  TooltipContainer
} from './setting-modal.styled.tsx'
import { IconCheck, IconClose } from '@components/atoms/icons/icons.tsx'
import { Button } from '@components/atoms/button/button.tsx'
import { SETTING_CONTROLS } from '@/const/settings.const.ts'
import { Input } from '@components/atoms/input'
import { useSettingModal } from '@/hooks/useSettingModal.ts'
import { Tooltip } from '@components/atoms/tooltip/tooltip.tsx'

interface Props {
  settings: Settings[]
  onClose: () => void
}

export default function SettingModal (props: Props) {
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
                                data-testid={`input-${item.label}`}
                                name={item.label}
                                value={getFormValue(item.label)}
                                onChange={onInputChange}
                                id={item.id} type='number'>
                                {!isControlValid(item.label)
                                  ? <span
                                    className='error-message'
                                    data-testid={`error-input-${item.label}`}>Invalid value. max: 60min and min: 1min</span>
                                  : null}
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
                    <ModalFormFontControl aria-label='font-content'>
                      <ModalControlTitle id='font-section'>{setting.name}</ModalControlTitle>
                      <ModalFormRadioControlGroup aria-labelledby="font-section">
                        {
                          setting.items.map((item) => (
                            <ModalFormColorControlItems key={item.id} aria-label={item.name}>
                              <ModalFormFontLabel
                                aria-label={item.name}
                                style={{
                                  fontFamily: item.value as string
                                }}
                                className={`${item.value === getFormValue('font') ? 'active' : ''}`}
                                htmlFor={item.id}>
                                <span aria-hidden={true}>Aa</span>
                              </ModalFormFontLabel>
                              <Input
                                name={'font'}
                                aria-labelledby={'font'}
                                value={item.value}
                                checked={item.value === getFormValue('font')}
                                onChange={onInputChange}
                                id={item.id}
                                type='radio'/>
                              {
                                item.value === getFormValue('font')
                                  ? (
                                    <TooltipContainer>
                                      <Tooltip show={item.value === getFormValue('font')}>{item.name}</Tooltip>
                                    </TooltipContainer>
                                    )
                                  : null
                              }
                            </ModalFormColorControlItems>
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
                            <ModalFormColorControlItems key={item.id} aria-label={item.name}>
                              <ModalFormColorLabel
                                data-testid={`input-${item.value}`}
                                color={item.value as string} htmlFor={item.id}>
                                {
                                  item.value === getFormValue('color')
                                    ? <IconCheck/>
                                    : null
                                }
                              </ModalFormColorLabel>
                              <Input
                                name={'color'}
                                aria-labelledby={'color'}
                                value={item.value}
                                onChange={onInputChange}
                                checked={item.value === getFormValue('color')}
                                id={item.id}
                                type='radio'/>
                              {
                                item.value === getFormValue('color')
                                  ? (
                                    <TooltipContainer>
                                      <Tooltip show={item.value === getFormValue('color')}>{item.name}</Tooltip>
                                    </TooltipContainer>
                                    )
                                  : null
                              }
                            </ModalFormColorControlItems>
                          ))
                        }
                      </ModalFormRadioControlGroup>
                    </ModalFormColorControl>
                  )
                }
              </React.Fragment>
            ))
          }

          <Button data-testid='apply-button' variant={'custom'}>Apply</Button>
        </ModalForm>
      </ModalWrapper>
    </>
  )
}
