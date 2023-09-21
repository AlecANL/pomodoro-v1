import styled from 'styled-components'

export const CircleIconStyled = styled.svg`
  stroke: ${props => props.stroke};

  circle {
    transform-origin: center;
    transform: rotate(-90deg);
    transition: all 0.5s ease-in-out;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    stroke-dasharray: ${props => props.strokeDasharray};
    stroke-dashoffset: ${props => props.strokeDashoffset};
  }
`
