export const SETTING_CONTROLS = {
  TIME: 'timeList',
  FONT: 'fontOption',
  COLOR: 'colorOption'
} as const

export const SWITCH_TURN_POMODORO = {
  ON: true,
  OFF: false
}

export const SWITCH_SHOW_MODAL = {
  SHOW: true,
  HIDE: false
}

export const TIME_IN_HOUR_MINUTES = 60
export const TIME_IN_SECONDS = 1000
export const ZERO_TIME = 0
export const TIME_TO_CALC_CHANGED_TME = 1

export type SettingControlsType = typeof SETTING_CONTROLS[keyof typeof SETTING_CONTROLS]

export const DEFAULT_DASH_ARRAY = '816.8140899333462 816.8140899333462'
export const DEFAULT_DASH_OFFSET = '0'
