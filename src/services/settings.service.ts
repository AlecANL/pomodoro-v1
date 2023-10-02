import { type Settings } from '@/models/time.interface.ts'

export const getAppSettings = async () => {
  const response = await fetch('/public/data/settings.json')
  return await (await response.json() as Promise<Settings[]>)
}
