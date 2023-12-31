import styled from 'styled-components'

export const TimerSectionStyled = styled.section`
  border-radius: 300px;
  background: linear-gradient(315deg, #2E325A 0%, #0E112A 100%);
  box-shadow: 50px 50px 100px 0 #121530, -50px -50px 100px 0px #272C5A;
  transition: transform 0.5s ease-in-out;
  margin-block: 10rem 8rem;

  @media (min-width: 768px) {
    transform: scale(1.5);
  }
`

export const FooterTimerStyled = styled.footer``

export const AppStyled = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const TimerLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h2 {
    font-size: clamp(5rem, 4.6094rem + 0.25vw, 5.3125rem);
    line-height: 6.1875rem;
  }

  span {
    font-size: clamp(0.875rem, 0.7188rem + 0.5vw, 1rem);
    display: inline-block;
    line-height: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.0625rem;
  }
`

export const TimerButton = styled.button`
  border-radius: 100%;
  padding: 0;
  margin: 0;
  border-color: transparent;
  background: #161932;
  transform: scale(.9);
`
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`
