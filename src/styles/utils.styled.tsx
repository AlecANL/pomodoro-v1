import { css, type CSSProp } from 'styled-components'

const BREAKPOINTS_KEYS = {
  S: 's',
  SM: 'sm',
  M: 'm',
  X: 'x',
  XL: 'xl',
  XXL: 'xxl'
} as const

const breakpoints = {
  [BREAKPOINTS_KEYS.S]: '320px',
  [BREAKPOINTS_KEYS.SM]: '480px',
  [BREAKPOINTS_KEYS.M]: '692px',
  [BREAKPOINTS_KEYS.X]: '768px',
  [BREAKPOINTS_KEYS.XL]: '1024px',
  [BREAKPOINTS_KEYS.XXL]: '1920px'
} as const

export type BreakpointType = typeof BREAKPOINTS_KEYS[keyof typeof BREAKPOINTS_KEYS]

export const from = (bp: BreakpointType) => (styles: CSSProp) => css`
  @media screen and (min-width: ${typeof breakpoints[bp] !== 'undefined' ? breakpoints[bp] : bp}) {
    ${styles};
  }
`
