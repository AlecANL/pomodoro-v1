import { ButtonStyled } from '@components/button/button.styled.tsx'
import { type ButtonHTMLAttributes } from 'react'
import { BUTTON_VARIANTS, type ButtonVariant } from '@/const/button.const.ts'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button (props: Props) {
  const { children, variant, ...rest } = props

  const getVariant = () => {
    if (!variant) return BUTTON_VARIANTS.NEUTRAL.toLowerCase()

    return variant
  }

  return (
    <ButtonStyled className={`variant-${getVariant()}`} {...rest}>
      {children}
    </ButtonStyled>
  )
}
