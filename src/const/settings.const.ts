export const SETTING_CONTROLS = {
  TIME: 'timeList',
  FONT: 'fontOption',
  COLOR: 'colorOption'
} as const

export type SettingControlsType = typeof SETTING_CONTROLS[keyof typeof SETTING_CONTROLS]
