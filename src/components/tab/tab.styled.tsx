import styled from 'styled-components'

export const TabStyled = styled.ul`
  display: flex;
  gap: .5rem;
  max-width: 28rem;
  background: var(--haiti);
  margin-top: 47px;
  padding: 8px;
  border-radius: 31px;

  li {
    border-radius: 50px;
  }

  li.active {
    background: var(--current-color);
    color: var(--violet);
  }

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
