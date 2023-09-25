import styled from 'styled-components'

export const TabStyled = styled.ul`
  position: relative;
  display: flex;
  gap: .5rem;
  max-width: 28rem;
  background: var(--haiti);
  margin-top: 47px;
  padding: 8px;
  border-radius: 31px;
  justify-content: space-between;
  min-height: calc(43px + 16px);


  button {
    background: transparent;
    border-color: transparent;
    font-size: 14px;
    font-weight: bold;
  }

  @media (min-width: 768px) {
    button {
      padding: 12px 24px;
    }
  }
`

export const TabItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 50px;
  z-index: 1;


  &.active {
    background: var(--current-color);
    color: var(--violet);
  }
`
