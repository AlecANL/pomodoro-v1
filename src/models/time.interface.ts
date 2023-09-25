export interface Settings {
  id: string
  name: string
  type: string
  control: string
  items: SettingItem[]
}

export interface SettingItem {
  id: string
  name: string
  value: number | string
  label?: string
}
