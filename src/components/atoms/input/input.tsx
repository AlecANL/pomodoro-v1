import { InputStyled } from '@components/atoms/input/input.styled.tsx'
import { type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

export function Input (props: Props) {
  const { children, ...rest } = props

  return (
    <>
      <InputStyled {...rest} />
      {children}
    </>
  )
}
