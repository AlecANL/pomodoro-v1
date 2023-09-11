import styled from 'styled-components'

export const CircleIconStyled = styled.svg`
  stroke: ${props => props.stroke};

  circle {
    stroke-dasharray: ${props => props.strokeDasharray};
    stroke-dashoffset: ${props => props.strokeDashoffset};
  }
`
