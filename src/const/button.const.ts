export const BUTTON_VARIANTS = {
  NEUTRAL: 'neutral',
  CUSTOM: 'custom'
} as const

export type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS]
