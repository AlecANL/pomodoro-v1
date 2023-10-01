import styled from 'styled-components'

export const CircleIconStyled = styled.svg`
  stroke: var(--current-color);
  stroke-dasharray: 816.8140899333462 816.8140899333462;
  stroke-dashoffset: 0;


  circle {
    transform-origin: center;
    transform: rotate(-90deg);
    transition: all 0.5s ease-in-out;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    stroke-dasharray: ${props => props.strokeDasharray};
    stroke-dashoffset: ${props => props.strokeDashoffset};
  }
`
