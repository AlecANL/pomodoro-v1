import styled from 'styled-components'
import { from } from '@/styles/utils.styled.tsx'

export const ModalWrapper = styled.div`
  color: var(--haiti);
`

export const ModalSettingTitle = styled.h3`
  font-size: clamp(1.25rem, 0.625rem + 2vw, 1.75rem);
`

export const ModalSettingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block-start: calc(34px - 20px);
  padding-block-end: 31px;
  border-bottom: 1px solid var(--light-gray);
  padding-inline: 20px;
  margin-inline: -20px -20px;
`

export const ModalForm = styled.form`
  position: relative;
  padding-inline: calc(1rem - 20px);

  button {
    background-color: var(--current-color);
    padding: 1rem 46px;
    border-radius: 100px;
    position: absolute;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--white);
  }

  ${from('m')`
    padding-inline: calc(40px - 20px);
  `}
`

export const ModalControlTitle = styled.h4`
  text-transform: uppercase;
  line-height: normal;
  letter-spacing: 4.231px;
`

export const ModalFormInputControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1.5rem;
  border-block-end: 1px solid var(--light-gray);

  h4 {
    margin-bottom: 1rem;
  }

  ${from('m')`
    h4 {
      margin-bottom: 22px;
    }
  `}
`

export const ModalFormInputItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 12px;
  place-items: center;

  label {
    color: var(--manatee);
  }

  span {
    color: var(--radical-red);
  }

  ${from('x')`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    
    label {
      align-self: flex-start;
    }
  `}
`

export const ModalFormFontControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-block-end: 1px solid var(--light-gray);
  padding-block: 1.5rem;


  h4 {
    font-size: 12px;
    margin-bottom: 1rem;
  }

  ${from('m')`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    
        
    h4 {
      margin: 0;
    }
  `}
`

export const ModalFormInputControlGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    font-size: 14px;
    font-weight: bold;
    font-family: var(--currentFont);
  }

  ${from('x')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
  `}
`

export const ModalFormColorControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1.5rem;
  margin-bottom: calc(70px - 1.5rem);

  h4 {
    font-size: 12px;
    margin-bottom: 1rem;
  }

  ${from('m')`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    
    h4 {
      margin: 0;
    }
  `}
`

export const ModalFormRadioControlGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

export const ModalFormColorControlItems = styled.div`
  position: relative;

  input {
    position: absolute;
    min-height: 0;
    visibility: hidden;
  }
`

export const ModalFormColorLabel = styled.label<{
  color: string
}>`
  position: relative;
  display: block;
  min-width: 50px;
  min-height: 50px;
  border-radius: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    outline: 1px solid var(--selago);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 40px;
    min-height: 40px;
    background-color: var(--${props => props.color});
    border-radius: 100%;
  }
`

export const ModalFormFontLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  min-height: 50px;
  border-radius: 100%;
  font-size: 1rem;
  isolation: isolate;
  color: hsla(233, 14%, 35%, 1.00);


  &:hover {
    outline: 1px solid var(--selago);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 40px;
    min-height: 40px;
    background-color: var(--selago);
    border-radius: 100%;
    z-index: -1;
  }

  &.active:before {
    background-color: var(--haiti);
  }

  &.active {
    color: var(--white);
  }
`
export const TooltipContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`
