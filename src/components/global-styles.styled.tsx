import { createGlobalStyle } from 'styled-components'
import { FONT_FAMILY_NAMES } from '@/const/fonts.const.ts'

export const GlobalStyles = createGlobalStyle`
  :root {
    --moonraker: #d7e0ff;
    --magenta: #d881f8;
    --cyan: #70f3f8;
    --radical-red: #f87070;
    --violet: #1e213f;
    --white: #fff;
    --black: #000;
    --selago: #eff1fa;
    --haiti: #161932;
    --topaz: #7a748c;
    --santas-grey: #a7a2b2;
    --light-gray: #e3e1e1;

    --currentFont: ${FONT_FAMILY_NAMES.KUMBH_SLAB};
    --current-color: var(--radical-red);
  }

  @font-face {
    font-family: ${FONT_FAMILY_NAMES.SPACE_MONO};
    src: url('/assets/fonts/SpaceMono-Bold.woff2');
    font-weight: bold;
    font-display: swap;
  }

  @font-face {
    font-family: ${FONT_FAMILY_NAMES.ROBOTO_SLAB};
    src: url('/assets/fonts/RobotoSlab-Bold.woff2');
    font-weight: bold;
    font-display: swap;
  }

  @font-face {
    font-family: ${FONT_FAMILY_NAMES.KUMBH_SLAB};
    src: url('/assets/fonts/KumbhSans-Bold.woff2');
    font-weight: bold;
    font-display: swap;
  }

  body {
    color: var(--moonraker);
    background: var(--violet);
    font-family: var(--currentFont);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: var(--currentFont);
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    font-family: inherit;
  }

  p {
    margin: 0;
    padding: 0;
    font-family: inherit;
  }

  button, a, ul, li {
    color: inherit;
    font-family: inherit;
  }

  span {
    font-family: inherit;
  }
`
