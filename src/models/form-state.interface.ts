export const FORM_STATE_KEY_VALUES_TIME = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak'
} as const

export const FORM_STATE_KEY_VALUES_SETTINGS = {
  FONT: 'font',
  COLOR: 'color'
} as const

export type FormStateKeyValues = typeof FORM_STATE_KEY_VALUES_TIME[keyof typeof FORM_STATE_KEY_VALUES_TIME]

export interface FormStateInterface {
  [FORM_STATE_KEY_VALUES_TIME.POMODORO]: FormStateValues
  [FORM_STATE_KEY_VALUES_TIME.SHORT_BREAK]: FormStateValues
  [FORM_STATE_KEY_VALUES_TIME.LONG_BREAK]: FormStateValues
  [FORM_STATE_KEY_VALUES_SETTINGS.FONT]: FormStateValues
  [FORM_STATE_KEY_VALUES_SETTINGS.COLOR]: FormStateValues
}

export interface TimeFormState extends Omit<FormStateInterface, 'font' | 'color'> {
}

export interface FormStateValues {
  value: string | number
  isValid: boolean
  id: string
}
